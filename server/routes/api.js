import express from 'express';
import MealLog from '../models/MealLog.js';
import NGO from '../models/NGO.js';

const router = express.Router();

// Helper: Haversine distance in km
const haversine = (lat1, lng1, lat2, lng2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// Route: Get Dashboard Metrics
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mealLogs = await MealLog.find({ date: { $gte: today } });

    const stats = {
      today_surplus_kg: mealLogs.reduce((sum, log) => sum + log.surplus_kg, 0),
      total_co2_avoided_kg: (await MealLog.aggregate([{ $group: { _id: null, total: { $sum: '$co2_kg' } } }]))[0]?.total || 0,
      total_meals_served: (await MealLog.aggregate([{ $group: { _id: null, total: { $sum: '$meals_equivalent' } } }]))[0]?.total || 0,
      sustainability_score: 84, // Mock score for initial MVP
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Get Nearby NGOs
router.get('/ngos/nearby', async (req, res) => {
  const { lat, lng } = req.query;
  try {
    const ngos = await NGO.find({ active: true });
    const nearbyNgos = ngos
      .map(ngo => ({
        ...ngo._doc,
        dist_km: haversine(lat, lng, ngo.lat, ngo.lng)
      }))
      .filter(ngo => ngo.dist_km <= 10)
      .sort((a, b) => a.dist_km - b.dist_km)
      .slice(0, 3);

    res.json(nearbyNgos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: Log Meal Data
router.post('/meal-log', async (req, res) => {
  try {
    const newLog = new MealLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

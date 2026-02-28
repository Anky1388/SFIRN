export function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateCO2(surplusKg: number): number {
  return surplusKg * 2.5;
}

export function calculateMeals(surplusKg: number): number {
  return Math.floor(surplusKg / 0.35);
}

export function calculateSustainabilityScore(avgWastePct: number, redistributionRate: number): number {
  const wasteScore = 100 - (avgWastePct * 1.5);
  const score = (wasteScore * 0.6) + (redistributionRate * 0.4);
  return Math.min(100, Math.max(0, score));
}

export function getScoreGrade(score: number): 'Platinum' | 'Gold' | 'Silver' | 'Bronze' {
  if (score >= 90) return 'Platinum';
  if (score >= 75) return 'Gold';
  if (score >= 60) return 'Silver';
  return 'Bronze';
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export function getCurrentMealSlot(): MealType {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const totalMin = hour * 60 + min;

  // Breakfast: 08:00 - 10:00 (480 - 600 min)
  if (totalMin >= 480 && totalMin <= 600) return 'breakfast';
  // Lunch: 12:30 - 14:30 (750 - 870 min)
  if (totalMin >= 750 && totalMin <= 870) return 'lunch';
  // Dinner: 19:30 - 21:30 (1170 - 1290 min)
  if (totalMin >= 1170 && totalMin <= 1290) return 'dinner';

  return 'lunch';
}

export const format24hTime = (date: Date) => {
  return date.toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

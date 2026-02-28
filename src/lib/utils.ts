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

export type MealType = 'breakfast' | 'lunch' | 'snacks' | 'dinner';

export const MEAL_SCHEDULE = {
  breakfast: { start: 480, end: 535, label: '08:00 - 08:55' },
  lunch: { start: 735, end: 780, label: '12:15 - 13:00' },
  snacks: { start: 1005, end: 1020, label: '16:45 - 17:00' },
  dinner: { start: 1200, end: 1260, label: '20:00 - 21:00' }
};

export function getCurrentMealSlot(): MealType {
  const now = new Date();
  const totalMin = now.getHours() * 60 + now.getMinutes();

  if (totalMin >= MEAL_SCHEDULE.breakfast.start && totalMin <= MEAL_SCHEDULE.breakfast.end) return 'breakfast';
  if (totalMin >= MEAL_SCHEDULE.lunch.start && totalMin <= MEAL_SCHEDULE.lunch.end) return 'lunch';
  if (totalMin >= MEAL_SCHEDULE.snacks.start && totalMin <= MEAL_SCHEDULE.snacks.end) return 'snacks';
  if (totalMin >= MEAL_SCHEDULE.dinner.start && totalMin <= MEAL_SCHEDULE.dinner.end) return 'dinner';

  if (totalMin < MEAL_SCHEDULE.breakfast.start) return 'breakfast';
  if (totalMin < MEAL_SCHEDULE.lunch.start) return 'lunch';
  if (totalMin < MEAL_SCHEDULE.snacks.start) return 'snacks';
  if (totalMin < MEAL_SCHEDULE.dinner.start) return 'dinner';

  return 'breakfast';
}

export function getSlotStatus(mealId: MealType): 'PASSED' | 'CURRENT' | 'UPCOMING' {
  const now = new Date();
  const totalMin = now.getHours() * 60 + now.getMinutes();
  const slot = MEAL_SCHEDULE[mealId];

  if (totalMin >= slot.start && totalMin <= slot.end) return 'CURRENT';
  if (totalMin > slot.end) return 'PASSED';
  return 'UPCOMING';
}

export const format24hTime = (date: Date) => {
  return date.toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

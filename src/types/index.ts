export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface AttendanceLog {
  id?: string;
  date: string;
  meal_type: MealType;
  attendance_count: number;
  created_at?: string;
}

export interface MealLog {
  id?: string;
  date: string;
  meal_type: MealType;
  prepared_kg: number;
  leftover_kg: number;
  is_edible: boolean;
  surplus_kg: number;
  waste_pct: number;
  co2_kg: number;
  meals_equivalent: number;
  attendance_count: number;
  alert_triggered: boolean;
  created_at?: string;
}

export interface NGO {
  id: string;
  name: string;
  contact_name: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  address: string;
  capacity_kg: number;
  active: boolean;
  total_received_kg: number;
}

export interface RedistributionLog {
  id?: string;
  date: string;
  meal_log_id: string;
  ngo_id: string;
  quantity_kg: number;
  meals_served: number;
  co2_avoided_kg: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  pickup_time?: string;
  created_at?: string;
}

export interface Prediction {
  id?: string;
  target_date: string;
  breakfast_surplus_kg: number;
  lunch_surplus_kg: number;
  dinner_surplus_kg: number;
  confidence: number;
  generated_at?: string;
}

export interface DashboardStats {
  today_surplus_kg: number;
  total_co2_avoided_kg: number;
  total_meals_served: number;
  sustainability_score: number;
}

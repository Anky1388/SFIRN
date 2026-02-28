import mongoose from 'mongoose';

const mealLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  prepared_kg: { type: Number, required: true },
  leftover_kg: { type: Number, required: true },
  is_edible: { type: Boolean, default: true },
  surplus_kg: { type: Number },
  waste_pct: { type: Number },
  co2_kg: { type: Number },
  meals_equivalent: { type: Number },
  attendance_count: { type: Number, required: true },
  alert_triggered: { type: Boolean, default: false }
}, { timestamps: true });

// Pre-save hook to calculate impact metrics automatically
mealLogSchema.pre('save', function(next) {
  this.surplus_kg = this.leftover_kg;
  this.waste_pct = (this.leftover_kg / this.prepared_kg) * 100;
  this.co2_kg = this.surplus_kg * 2.5;
  this.meals_equivalent = Math.floor(this.surplus_kg / 0.35);

  if (this.is_edible && this.surplus_kg >= 5) {
    this.alert_triggered = true;
  }

  next();
});

export default mongoose.model('MealLog', mealLogSchema);

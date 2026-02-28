import mongoose from 'mongoose';

const attendanceLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  attendance_count: { type: Number, required: true }
}, { timestamps: true });

// Ensure unique (date + meal_type)
attendanceLogSchema.index({ date: 1, meal_type: 1 }, { unique: true });

export default mongoose.model('AttendanceLog', attendanceLogSchema);

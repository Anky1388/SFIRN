import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['present', 'absent'], default: 'present' }
}, { timestamps: true });

// Ensure a student can only mark attendance once per meal per day
attendanceSchema.index({ date: 1, meal_type: 1, student: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);

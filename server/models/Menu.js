import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  items: [{ name: String, category: String }], // e.g., { name: 'Dal Tadka', category: 'Main' }
  mess_owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  suggested_quantity_kg: { type: Number } // Filled by AI later
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);

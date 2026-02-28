import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact_name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: { type: String, required: true },
  capacity_kg: { type: Number, required: true },
  active: { type: Boolean, default: true },
  total_received_kg: { type: Number, default: 0 }
});

export default mongoose.model('NGO', ngoSchema);

import mongoose, { Schema, models } from 'mongoose'

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
  },
  { timestamps: true }
)
export const User = mongoose.models.User || mongoose.model('User', userSchema);

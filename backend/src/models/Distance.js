import mongoose, { Schema } from 'mongoose'

export const DistanceSchema = Schema({
  value: Number,
  unit: String
})

export default mongoose.model('Distance', DistanceSchema)

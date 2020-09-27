import mongoose, { Schema } from 'mongoose'
import { DistanceSchema } from './Distance'

const { ObjectId } = Schema.Types

export const ActivitySchema = Schema({
  type: String,
  duration: Number,
  distance: DistanceSchema,
  equipment: {
    type: ObjectId,
    ref: 'Equipment'
  },
  additionalInfo: {
    averageHeartRate: Number,
    elevationGain: Number,
    calories: Number
  }
})

ActivitySchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('Activity', ActivitySchema)

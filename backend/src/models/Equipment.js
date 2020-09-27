import mongoose, { Schema } from 'mongoose'
import { DistanceSchema } from './Distance'

const { ObjectId } = Schema.Types

const EquipmentSchema = Schema({
  name: String,
  type: String,
  usage: DistanceSchema,
  limit: DistanceSchema,
  active: Boolean,
  owner: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

EquipmentSchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('Equipment', EquipmentSchema)

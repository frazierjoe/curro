import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types

const TeamSchema = Schema({
  name: {
    type: String, 
    unique: true,
    uniqueCaseInsensitive: true
  },
  description: String,
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  adminList: [{
    type: ObjectId,
    ref: 'User'
  }],
  memberList: [{
    type: ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

TeamSchema.pre('save', async function () {
  // Pre-save function
})

TeamSchema.plugin(uniqueValidator)
export default mongoose.model('Team', TeamSchema)

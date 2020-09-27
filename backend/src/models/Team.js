import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const TeamSchema = Schema({
  name: String,
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

export default mongoose.model('Team', TeamSchema)

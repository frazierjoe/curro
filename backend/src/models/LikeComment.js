import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const LikeCommentSchema = Schema({
  comment: {
    type: ObjectId,
    ref: 'Comment'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
})

LikeCommentSchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('LikeComment', LikeCommentSchema)

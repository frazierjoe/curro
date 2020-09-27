import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const LikePostSchema = Schema({
  post: {
    type: ObjectId,
    ref: 'Post'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
})

LikePostSchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('LikePost', LikePostSchema)

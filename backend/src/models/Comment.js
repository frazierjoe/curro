import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const CommentSchema = Schema({
  note: String,
  post: {
    type: ObjectId,
    ref: 'Post'
  },
  author: {
    type: ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

CommentSchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('Comment', CommentSchema)

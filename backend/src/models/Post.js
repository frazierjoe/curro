import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const PostSchema = Schema({
  title: String,
  note: String,
  post: {
    type: ObjectId,
    ref: 'Post'
  },
  author: {
    type: ObjectId,
    ref: 'User'
  },
  activityList: [{
    type: ObjectId,
    ref: 'Activity'
  }],
  tagList: [{
    type: ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

PostSchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('Post', PostSchema)

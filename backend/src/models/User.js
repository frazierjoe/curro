import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const UserSchema = Schema({
  email: String,
  first: String,
  last: String,
  username: String,
  password: String,
  profilePictureURL: String,
  birthdate: String,
  bio: String,
  private: Boolean,
  teamList: [{
    type: ObjectId,
    ref: 'Team'
  }],
  equipmentList: [{
    type: ObjectId,
    ref: 'Equipment'
  }],
  followerList: [{
    type: ObjectId,
    ref: 'User'
  }],
  followingList: [{
    type: ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

UserSchema.pre('save', async function () {
  // Pre-save function
})

export default mongoose.model('User', UserSchema)

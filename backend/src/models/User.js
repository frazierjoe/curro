import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { hash } from 'bcryptjs'


const { ObjectId } = Schema.Types

const UserSchema = Schema({
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true
  },
  first: String,
  last: String,
  username: { 
    type: String, 
    unique: true,
    uniqueCaseInsensitive: true
  },
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

UserSchema.pre('save', async function (next) {
  if(this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10)
    } catch (err) {
      next(err)
    }
  }
  next()
})

UserSchema.plugin(uniqueValidator)
export default mongoose.model('User', UserSchema)

import mongoose from 'mongoose'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { User, Post } from '../models'

export default {
  Query: {
    userList: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid UserID')
      }

      return User.findById(id)
    }
  },
  Mutation: {
    createUser: async (root, { input: args }, context, info) => {
      const { email, first, last, username, password, birthdate } = args
      // TODO: not auth
      // TODO make sure email is not already taken, since its the unique value

      // Perform validation
      const user = await User.create({
        email,
        first,
        last,
        username,
        password,
        birthdate,
        teamList: [],
        equipmentList: [],
        followerList: [],
        followingList: [],
        private: false
      })

      return user
    },
    updateUser: async (root, { input: args }, context, info) => {
      const { userId, ...body } = args

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const user = await User.findByIdAndUpdate(userId, body, { new: true })

        return user
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    followUser: async (root, { input: args }, context, info) => {
      const { userId, followerId } = args

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followerId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this

        // TODO: check if user is following in the first place.

        // User is following someone
        await User.findByIdAndUpdate(userId, {
          $addToSet: { followingList: followerId }
        })

        // FollowingID gets a follower
        await User.findByIdAndUpdate(followerId, {
          $addToSet: { followerList: userId }
        })

        return { message: 'Follower Added', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    unfollowUser: async (root, { input: args }, context, info) => {
      const { userId, followerId } = args

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(followerId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this

        // TODO: check if user is following in the first place.

        // User is unfollowing someone
        await User.findByIdAndUpdate(userId, {
          $pull: { followingList: followerId }
        })

        // FollowingID loses a follower
        await User.findByIdAndUpdate(followerId, {
          $pull: { followerList: userId }
        })

        return { message: 'Follower Removed', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    deleteUser: async (root, { input: args }, context, info) => {
      const { userId } = args
      // TODO: add validaiton with email, username and password...
      //, email, password <-- to confirm delete

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const user = await User.findById(userId)
        // TODO: Checks, auth, validation
        await user.delete()

        return { message: 'User Deleted', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  User: {
    postList: (user, args, context, info) => {
      // TODO: pagination, projection
      return Post.find({ author: user.id })
    },
    teamList: async (user, args, context, info) => {
      await user.populate('teamList').execPopulate()
      return user.teamList
    },
    equipmentList: async (user, args, context, info) => {
      await user.populate('equipmentList').execPopulate()
      return user.equipmentList
    },
    followerList: async (user, args, context, info) => {
      await user.populate('followerList').execPopulate()
      return user.followerList
    },
    followingList: async (user, args, context, info) => {
      await user.populate('followingList').execPopulate()
      return user.followingList
    }
  }
}

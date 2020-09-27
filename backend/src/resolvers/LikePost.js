import mongoose from 'mongoose'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { LikePost } from '../models'

export default {
  Query: {
    likePost: (root, args, context, info) => {
      const { id } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return LikePost.findById(id)
    },
    likePostListByPostId: (root, args, context, info) => {
      const { postId } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return LikePost.find({ post: postId })
    }
  },
  Mutation: {
    createLikePost: async (root, { input: args }, context, info) => {
      const { postId, userId } = args

      if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }
      // TODO: auth

      // Perform validation
      const likePost = await LikePost.create({
        post: postId,
        user: userId
      })

      return likePost
    },
    deleteLikePost: async (root, { input: args }, context, info) => {
      const { postId, userId } = args
      // TODO: auth

      if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        await LikePost.deleteOne({ post: postId, user: userId })

        return { message: 'Like Removed', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  LikePost: {
    post: async (likePost, args, context, info) => {
      await likePost.populate('post').execPopulate()
      return likePost.post
    },
    user: async (likePost, args, context, info) => {
      await likePost.populate('user').execPopulate()
      return likePost.user
    }
  }
}

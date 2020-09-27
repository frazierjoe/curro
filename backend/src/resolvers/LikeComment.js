import mongoose from 'mongoose'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { LikeComment } from '../models'

export default {
  Query: {
    likeComment: (root, args, context, info) => {
      const { id } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return LikeComment.findById(id)
    },
    likeCommentListByCommentId: (root, args, context, info) => {
      const { commentId } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return LikeComment.find({ comment: commentId })
    }
  },
  Mutation: {
    createLikeComment: async (root, { input: args }, context, info) => {
      const { commentId, userId } = args

      if (!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }
      // TODO: auth

      // Perform validation
      const likeComment = await LikeComment.create({
        comment: commentId,
        user: userId
      })

      return likeComment
    },
    deleteLikeComment: async (root, { input: args }, context, info) => {
      const { commentId, userId } = args
      // TODO: auth

      if (!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        await LikeComment.deleteOne({ comment: commentId, user: userId })

        return { message: 'Like Removed', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  LikeComment: {
    comment: async (likeComment, args, context, info) => {
      await likeComment.populate('comment').execPopulate()
      return likeComment.comment
    },
    user: async (likeComment, args, context, info) => {
      await likeComment.populate('user').execPopulate()
      return likeComment.user
    }
  }
}

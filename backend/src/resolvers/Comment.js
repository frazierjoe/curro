import mongoose from 'mongoose'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { Comment, LikeComment } from '../models'

export default {
  Query: {
    comment: (root, args, context, info) => {
      const { id } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return Comment.findById(id)
    }
  },
  Mutation: {
    createComment: async (root, { input: args }, context, info) => {
      const { note, postId, authorId } = args
      // TODO: auth

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      // Perform validation
      const comment = await Comment.create({
        note,
        post: postId,
        author: authorId,
        likeList: []
      })

      return comment
    },
    deleteComment: async (root, args, context, info) => {
      const { commentId } = args

      try {
        const comment = await Comment.findById(commentId)
        // TODO: Checks, auth, validation

        // Deleting all Likes for the comment
        // TODO: test this
        await LikeComment.deleteMany({ comment: commentId })

        await comment.delete()

        return { message: 'Comment Deleted', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  Comment: {
    author: async (comment, args, context, info) => {
      await comment.populate('author').execPopulate()
      return comment.author
    },
    likeList: async (comment, args, context, info) => {
      return LikeComment.find({ comment: comment.id })
    }
  }
}

import mongoose from 'mongoose'
import { UserInputError, ApolloError, withFilter } from 'apollo-server-express'
import { Post, Comment, LikePost, Activity } from '../models'
import pubsub from './subscriptions'
import { paginateResults } from '../utils/paginate'

const MESSAGE = {
  NEW_POST_CREATED: 'NEW_POST_CREATED',
  NEW_POST_BY_FOLLOWING: 'NEW_POST_BY_FOLLOWING'
}

export default {
  Subscription: {
    onPostCreate: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([MESSAGE.NEW_POST_CREATED])
    },
    onPostCreateByFollowingList: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE.NEW_POST_BY_FOLLOWING),
        (payload, { followingList }) => {
          return followingList.includes(payload.authorId)
        }
      )
    }
  },
  Query: {
    post: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return Post.findById(id)
    },
    postListByUserId: (root, { userId }, context, info) => {
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }
      // TODO: This me need fixing
      return Post.find({ author: userId })
    },
    postList: async (root, { pageSize = 20, after }, context, info) => {
      // TODO: auth, projection, pagination

      const allPosts = await Post.find({}).sort({ updatedAt: -1 })

      const posts = paginateResults({
        after,
        pageSize,
        results: allPosts,
        getCursor: (item) => { return item._id }
      })

      return {
        posts,
        cursor: posts.length ? posts[posts.length - 1]._id : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: posts.length
          ? posts[posts.length - 1]._id !==
            allPosts[allPosts.length - 1]._id
          : false
      }
    }
  },
  Mutation: {
    createPost: async (root, { input: args }, context, info) => {
      const { title, note, authorId, activityIdList, tagIdList } = args

      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }
      // TODO: auth

      // Perform validation
      const post = await Post.create({
        title,
        note,
        author: authorId,
        activityList: activityIdList,
        tagList: tagIdList
      })
      pubsub.publish(MESSAGE.NEW_POST_CREATED, { onPostCreate: post })
      pubsub.publish(MESSAGE.NEW_POST_BY_FOLLOWING, { authorId: authorId, onPostCreateByFollowingList: post })
      return post
    },
    updatePost: async (root, { input: args }, context, info) => {
      const { postId, ...body } = args

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const post = await Post.findByIdAndUpdate(postId, body, { new: true })

        return post
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    addActivity: async (root, { input: args }, context, info) => {
      const { postId, activityId } = args

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      if (!mongoose.Types.ObjectId.isValid(activityId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this
        await Post.findByIdAndUpdate(postId, {
          $addToSet: { activityList: activityId }
        })

        return { message: 'Activity Added', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    removeActivity: async (root, { input: args }, context, info) => {
      const { postId, activityId } = args

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      if (!mongoose.Types.ObjectId.isValid(activityId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this
        await Post.findByIdAndUpdate(postId, {
          $pull: { activityList: activityId }
        })

        await Activity.findByIdAndDelete(activityId)

        return { message: 'Activity Removed and Deleted', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    addTag: async (root, { input: args }, context, info) => {
      const { postId, userId } = args

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this
        await Post.findByIdAndUpdate(postId, {
          $addToSet: { tagList: userId }
        })

        return { message: 'Tag Added', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    removeTag: async (root, { input: args }, context, info) => {
      const { postId, userId } = args

      if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this
        await Post.findByIdAndUpdate(postId, {
          $pull: { tagList: userId }
        })

        return { message: 'Tag Removed', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    deletePost: async (root, args, context, info) => {
      const { postId } = args

      if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const post = await Post.findById(postId)
        // TODO: Checks, auth, validation
        await LikePost.deleteMany({ post: postId })
        await Comment.deleteMany({ post: postId })

        await post.delete()

        return { message: 'Post Deleted', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  Post: {
    author: async (post, args, context, info) => {
      await post.populate('author').execPopulate()
      return post.author
    },
    activityList: async (post, args, context, info) => {
      await post.populate('activityList').execPopulate()
      return post.activityList
    },
    commentList: async (post, args, context, info) => {
      return Comment.find({ post: post.id })
    },
    likeList: async (post, args, context, info) => {
      return LikePost.find({ post: post.id })
    },
    tagList: async (post, args, context, info) => {
      await post.populate('tagList').execPopulate()
      return post.tagList
    }
  }
}

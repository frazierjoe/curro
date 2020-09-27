import mongoose from 'mongoose'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { Team, User } from '../models'

export default {
  Query: {
    teamList: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return Team.find({})
    },
    team: (root, args, context, info) => {
      const { id } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return Team.findById(id)
    },
    teamListByOwner: (root, args, context, info) => {
      const { ownerId } = args

      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }
      // TODO: This me need fixing
      return Team.find({ owner: ownerId })
    }
  },
  Mutation: {
    createTeam: async (root, { input: args }, context, info) => {
      const { name, description, ownerId } = args
      // TODO: auth

      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      // Perform validation
      const team = await Team.create({
        name,
        description,
        owner: ownerId,
        adminList: [ownerId],
        memberList: []
      })

      await User.findByIdAndUpdate(ownerId, {
        $addToSet: { teamList: team._id }
      })

      return team
    },
    updateTeam: async (root, { input: args }, context, info) => {
      const { teamId, ...body } = args

      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const team = await Team.findByIdAndUpdate(teamId, body, { new: true })

        return team
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    joinTeam: async (root, { input: args }, context, info) => {
      const { userId, teamId } = args

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(teamId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this

        // User is following someone
        await Team.findByIdAndUpdate(teamId, {
          $addToSet: { memberList: userId }
        })

        // remove from admin list if in admin list

        // FollowingID gets a follower
        await User.findByIdAndUpdate(userId, {
          $addToSet: { teamList: teamId }
        })

        return { message: 'Joined Team', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    leaveTeam: async (root, { input: args }, context, info) => {
      const { userId, teamId } = args

      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(teamId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this

        // Actually check if in team first.
        await Team.findByIdAndUpdate(teamId, {
          $pull: { memberList: userId }
        })

        // FollowingID gets a follower
        await User.findByIdAndUpdate(userId, {
          $pull: { teamList: teamId }
        })

        return { message: 'Left Team', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    addAdmin: async (root, { input: args }, context, info) => {
      const { userId, teamId } = args

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // This is assuming that you are a member before u can be an admin
        // TODO: Checks, auth, validation
        // TODO: test this

        await Team.findByIdAndUpdate(teamId, {
          $pull: { memberList: userId },
          $addToSet: { adminList: userId }
        })

        // remove from member list if in member list
        // only push into teamList if it doesn't exist beforehand
        // FollowingID gets a follower
        // await User.update(userId, {
        //   $push: { teamList: teamId }
        // })

        return { message: 'Admin Added', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    removeAdmin: async (root, { input: args }, context, info) => {
      const { userId, teamId } = args

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        // TODO: Checks, auth, validation
        // TODO: test this

        // Actually check if in team first.
        // Doesn't remove from team
        await Team.findByIdAndUpdate(teamId, {
          $pull: { adminList: userId },
          $addToSet: { memberList: userId }
        })

        // FollowingID gets a follower
        // await User.update(userId, {
        //   $pull: { teamList: teamId }
        // })

        return { message: 'Admin Removed', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    deleteTeam: async (root, args, context, info) => {
      // TODO
      const { teamId } = args

      if (!mongoose.Types.ObjectId.isValid(teamId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const team = await Team.findById(teamId)
        // TODO: Checks, auth, validation
        // you have to delete team and remove that team from each user on that team...

        // TODO: test this
        await User.findByIdAndUpdate({ $in: team.memberList.concat(team.adminList) }, {
          $pull: { teamList: teamId }
        })

        // await User.findByIdAndUpdate({ $in: team.adminList }, {
        //   $pull: { teamList: teamId }
        // })

        await team.delete()

        return { message: 'Team Deleted, Users Removed', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  Team: {
    owner: async (team, args, context, info) => {
      await team.populate('owner').execPopulate()
      return team.owner
    },
    adminList: async (team, args, context, info) => {
      await team.populate('adminList').execPopulate()
      return team.adminList
    },
    memberList: async (team, args, context, info) => {
      await team.populate('memberList').execPopulate()
      return team.memberList
    }
  }
}

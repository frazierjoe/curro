import mongoose from 'mongoose'
import { UserInputError, ApolloError } from 'apollo-server-express'
import { Equipment, User, Activity } from '../models'

export default {
  Query: {
    equipmentList: (root, args, context, info) => {
      // TODO: auth, projection, pagination

      return Equipment.find({})
    },
    equipment: (root, args, context, info) => {
      const { id } = args
      // TODO: auth, projection, sanitization

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      return Equipment.findById(id)
    }
  },
  Mutation: {
    createEquipment: async (root, { input: args }, context, info) => {
      const { name, type, limit, ownerId } = args
      // TODO: auth

      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      // Perform validation
      const equipment = await Equipment.create({
        name,
        type,
        usage: { value: 0.0, unit: 'MI' },
        limit,
        active: true,
        owner: ownerId
      })

      await User.findByIdAndUpdate(ownerId, {
        $addToSet: { equipmentList: equipment._id }
      })

      return equipment
    },
    updateEquipment: async (root, { input: args }, context, info) => {
      const { equipmentId, ...body } = args

      try {
        const equipment = await Equipment.findByIdAndUpdate(equipmentId, body, { new: true })

        return equipment
      } catch (e) {
        throw new ApolloError(e)
      }
    },
    deleteEquipment: async (root, args, context, info) => {
      const { equipmentId } = args

      if (!mongoose.Types.ObjectId.isValid(equipmentId)) {
        throw new UserInputError('ID is not a valid ObjectID')
      }

      try {
        const equipment = await Equipment.findById(equipmentId)
        // TODO: Checks, auth, validation

        // TODO: test these
        await Activity.where('equipment', equipmentId).update({ $set: { equipment: null } })

        await User.findByIdAndUpdate(equipment.owner, {
          $pull: { equipmentList: equipmentId }
        })

        await equipment.delete()

        return { message: 'Equipment Deleted', success: true }
      } catch (e) {
        throw new ApolloError(e)
      }
    }
  },
  Equipment: {
    owner: async (equipment, args, context, info) => {
      await equipment.populate('owner').execPopulate()
      return equipment.owner
    }
  }
}

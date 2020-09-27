import { getClient, useQuery, useMutation } from './helper'
import { gql } from 'apollo-server-express'

let client

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input){
      id 
    }
  }
`
const CREATE_EQUIPMENT_MUTATION = gql`
  mutation CreateEquipment($input: CreateEquipmentInput!){
    createEquipment(input: $input) {
      id
      type
      name
      active
      limit {
        value
        unit
      }
      usage {
        unit
        value
      }
      owner {
        id
        username
      }
    }
  }
`

const USER_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      equipmentList {
        id
        name
      }
    }
  }
`

beforeAll(async () => {
  client = await getClient()
})

describe('Equipment Resolver', () => {
  it('Checks if equipment is created for a user and added to users equipment list', async () => {
    // create a test user and check if the user was created
    const userResponse = await useMutation(client, CREATE_USER_MUTATION, {
      input: {
        email: 'test@gmail.com',
        first: 'test',
        last: 'testing',
        username: 'test',
        password: 'Test123!',
        birthdate: '1998-09-18T21:26:17Z'
      }
    })
    const testUser = userResponse.data.createUser

    expect(testUser.id).toBeDefined()

    // check if the equipment was created with the proper fields and default values
    const equipmentResponse = await useMutation(client, CREATE_EQUIPMENT_MUTATION,
      {
        input: {
          name: 'TestShoe',
          type: 'SHOE',
          limit: { value: 300.0, unit: 'MI' },
          ownerId: testUser.id
        }
      }
    )
    const testEquipment = equipmentResponse.data.createEquipment

    expect(testEquipment.name).toBe('TestShoe')
    expect(testEquipment.type).toBe('SHOE')
    expect(testEquipment.active).toBeTruthy()
    expect(testEquipment.limit.value).toBe(300)
    expect(testEquipment.limit.unit).toBe('MI')
    expect(testEquipment.usage.value).toBe(0)
    expect(testEquipment.usage.unit).toBe('MI')
    expect(testEquipment.owner.id).toBe(testUser.id)

    // Check if the user equipment list is updated
    const updateUserResponse = await useQuery(client, USER_QUERY,
      {
        id: testUser.id
      }
    )
    const updatedUser = updateUserResponse.data.user

    expect(updatedUser.id).toBe(testUser.id)
    expect(updatedUser.equipmentList[0].id).toBe(testEquipment.id)
  })
})

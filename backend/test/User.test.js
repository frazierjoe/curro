import { getClient, useQuery, useMutation } from './helper'
import { gql } from 'apollo-server-express'

let client

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!){
    createUser(input: $input){
      id
      email
      first
      last
      username
      profilePictureURL
      birthdate
      bio
      private
      postList {
        id
      }
      teamList {
        id
      }
      equipmentList {
        id
      }
      createdAt
      updatedAt
    }
  }
`

const USER_QUERY = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      email
      first
      last
      username
      profilePictureURL
      birthdate
      bio
      private
      postList {
        id
      }
      teamList {
        id
      }
      equipmentList {
        id
      }
      createdAt
      updatedAt
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      first
      last
      username
      profilePictureURL
      birthdate
      bio
      private
    }
  }
`

const DELETE_USER_MUTATION = gql`
  mutation updateUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      message
      success
    }
  }
`

beforeAll(async () => {
  client = await getClient()
})

describe('User Resolver', () => {
  it('Checks if user is created with proper default values', async () => {
    // create a test user and check if the user was created
    const userResponse = await useMutation(client, CREATE_USER_MUTATION, {
      input: {
        email: 'rbg@gmail.com',
        first: 'Ruth',
        last: 'Ginsburg',
        username: 'rbg',
        password: 'Equality4All!',
        birthdate: '1933-03-15T21:26:17Z'
      }
    })
    const testUser = userResponse.data.createUser

    expect(testUser.id).toBeDefined()
    expect(testUser.email).toBe('rbg@gmail.com')
    expect(testUser.first).toBe('Ruth')
    expect(testUser.last).toBe('Ginsburg')
    expect(testUser.username).toBe('rbg')
    expect(testUser.birthdate).toBe('1933-03-15T21:26:17Z')
    expect(testUser.profilePictureURL).toBeNull()
    expect(testUser.bio).toBeNull()
    expect(testUser.private).toBeFalsy()
    expect(testUser.createdAt).toBeDefined()
    expect(testUser.updatedAt).toBeDefined()
    expect(testUser.postList).toBeDefined()
    expect(testUser.teamList).toBeDefined()
    expect(testUser.equipmentList).toBeDefined()

    // Check if the user query works
    const queryUserResponse = await useQuery(client, USER_QUERY,
      {
        id: testUser.id
      }
    )
    const queryUser = queryUserResponse.data.user

    expect(queryUser.id).toBe(testUser.id)
    expect(queryUser.id).toBeDefined()
    expect(queryUser.email).toBe('rbg@gmail.com')
    expect(queryUser.first).toBe('Ruth')
    expect(queryUser.last).toBe('Ginsburg')
    expect(queryUser.username).toBe('rbg')
    expect(queryUser.birthdate).toBe('1933-03-15T21:26:17Z')
    expect(queryUser.profilePictureURL).toBeNull()
    expect(queryUser.bio).toBeNull()
    expect(queryUser.private).toBeFalsy()
    expect(queryUser.createdAt).toBeDefined()
    expect(queryUser.updatedAt).toBeDefined()
    expect(queryUser.postList).toBeDefined()
    expect(queryUser.teamList).toBeDefined()
    expect(queryUser.equipmentList).toBeDefined()

    // Check if updating the user information works
    const updateUserResponse = await useMutation(client, UPDATE_USER_MUTATION,
      {
        input: {
          userId: testUser.id,
          email: 'supremeRBG@gmail.com',
          first: 'Ruthy',
          last: 'Ginsburn',
          username: 'ginsburn',
          profilePictureURL: 'https://news.wttw.com/sites/default/files/field/image/NotoriousRBGExhibition_0217.jpg',
          birthdate: '1933-03-15T10:12:19Z',
          bio: 'You can disagree without being disagreeable',
          private: true
        }
      }
    )
    const updatedUser = updateUserResponse.data.updateUser

    expect(updatedUser.id).toBe(testUser.id)
    expect(updatedUser.id).toBeDefined()
    expect(updatedUser.email).toBe('supremeRBG@gmail.com')
    expect(updatedUser.first).toBe('Ruthy')
    expect(updatedUser.last).toBe('Ginsburn')
    expect(updatedUser.username).toBe('ginsburn')
    expect(updatedUser.birthdate).toBe('1933-03-15T10:12:19Z')
    expect(updatedUser.bio).toBe('You can disagree without being disagreeable')
    expect(updatedUser.private).toBeTruthy()

    // check if removing a user works
    const deleteUserResponse = await useMutation(client, DELETE_USER_MUTATION,
      {
        input: {
          userId: testUser.id,
          email: 'supremeRBG@gmail.com',
          password: 'Equality4All!'
        }
      }
    )
    const deleteUser = deleteUserResponse.data.updateUser

    expect(deleteUser.success).toBeTruthy()
    expect(deleteUser.message).toBeDefined()

    // TODO test follow user
    // TODO test unfollow user
    // TODO test
  })
})

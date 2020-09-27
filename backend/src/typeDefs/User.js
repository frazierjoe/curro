import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    # me: User
    user(id: ID!): User
    userList: [User!]!
  }

  input CreateUserInput {
    email: String!
    first: String!
    last: String!
    username: String!
    password: String!
    birthdate: String
  }

  input DeleteUserInput {
    userId: ID!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    userId: ID!
    email: String
    username: String
    first: String
    last: String
    profilePictureURL: String
    birthdate: String
    password: String
    bio: String
    private: Boolean
  }

  input FollowUserInput {
    userId: ID!
    followerId: ID!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
    followUser(input: FollowUserInput): SuccessMessage!
    unfollowUser(input: FollowUserInput): SuccessMessage!
    deleteUser(input: DeleteUserInput!): SuccessMessage!
  }

  type User {
    id: ID!
    email: String!
    first: String!
    last: String!
    username: String!
    profilePictureURL: String
    birthdate: String
    bio: String
    private: Boolean!
    postList: [Post!]!
    teamList: [Team!]!
    equipmentList: [Equipment!]!
    followerList: [User!]!
    followingList: [User!]!
    createdAt: String!
    updatedAt: String!
  }
`

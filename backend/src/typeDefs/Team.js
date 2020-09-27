import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    team(id: ID!): Team
    teamList: [Team!]!
    teamListByOwner(ownerId: ID!): [Team!]!
  }

  input CreateTeamInput {
    name: String!
    description: String
    ownerId: ID!
  }

  input UpdateTeamInput {
    teamId: ID!
    name: String
    description: String
    ownerId: ID
  }

  input UserTeamInput {
    userId: ID!
    teamId: ID!
  }

  extend type Mutation {
    createTeam(input: CreateTeamInput!): Team!
    updateTeam(input: UpdateTeamInput!): Team!
    joinTeam(input: UserTeamInput): SuccessMessage!
    leaveTeam(input: UserTeamInput): SuccessMessage!
    addAdmin(input: UserTeamInput): SuccessMessage!
    removeAdmin(input: UserTeamInput): SuccessMessage!
    deleteTeam(teamId: ID!): SuccessMessage!
  }
  
  type Team {
    id: ID!
    name: String!
    description: String!
    owner: User!
    adminList: [User!]!
    memberList: [User!]!
    createdAt: String!
    updatedAt: String!
  }
`

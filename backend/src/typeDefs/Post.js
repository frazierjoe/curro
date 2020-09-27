import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    post(id: ID!): Post
    postListByUserId(userId: ID!): [Post!]!
    postList(pageSize: Int, after: String): PostConnection!
  }

  type PostConnection {
    cursor: String!
    hasMore: Boolean!
    posts: [Post]!
  }

  extend type Subscription {
    onPostCreate: Post
    onPostCreateByFollowingList(followingList: [ID!]!): Post
  }

  input CreatePostInput {
    title: String!
    note: String
    authorId: ID!
    activityIdList: [ID!]!
    tagIdList: [ID!]!
  }

  input UpdatePostInput {
    postId: ID!
    title: String
    note: String
  }

  input PostActivityInput {
    postId: ID!
    activityId: ID!
  }

  input PostTagInput {
    postId: ID!
    userId: ID!
  }
  
  extend type Mutation {
    createPost(input: CreatePostInput): Post!
    updatePost(input: UpdatePostInput): Post!
    deletePost(postId: ID!): SuccessMessage!
    addActivity(input: PostActivityInput): SuccessMessage!
    removeActivity(input: PostActivityInput): SuccessMessage!
    addTag(input: PostTagInput): SuccessMessage!
    removeTag(input: PostTagInput): SuccessMessage!
  }
  
  type Post {
    id: ID!
    title: String!
    note: String
    author: User!
    tagList: [User!]!
    createdAt: String!
    updatedAt: String!
    activityList: [Activity!]!
    likeList: [LikePost!]!
    commentList: [Comment!]!
  }
`

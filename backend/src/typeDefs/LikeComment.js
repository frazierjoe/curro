import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    likeComment(id: ID!): LikeComment
    # likeCommentList: [LikeComment!]!
    likeCommentListByCommentId(commentId: ID!): [LikeComment!]!
  }

  input CreateLikeCommentInput {
    commentId: ID!
    userId: ID! 
  }

  input DeleteLikeCommentInput {
    commentId: ID!
    userId: ID! 
  }

  extend type Mutation {
    createLikeComment(input: CreateLikeCommentInput): LikeComment!
    deleteLikeComment(input: DeleteLikeCommentInput): SuccessMessage!
  }

  type LikeComment {
    id: ID!
    comment: Comment!
    user: User!
  }
`

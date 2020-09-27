import { gql } from 'apollo-server-express'

export default gql`

  type SuccessMessage {
    message: String!
    success: Boolean!
  }
`

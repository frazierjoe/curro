import { gql } from 'apollo-server-express'

export default gql`
  enum AllowedUnit {
    KM
    YDS
    MI
    M
  }

  type Distance {
    value: Float!
    unit: AllowedUnit!
  }

  input DistanceInput {
    value: Float!
    unit: AllowedUnit!
  }
`

// import { getClient, useQuery, useMutation } from './helper'
// import { gql } from 'apollo-server-express'

async function tempQuery () {
  // const client = getClient()

  // const USER_QUERY = gql`
  //   query {
  //     userList {
  //       id
  //       username
  //       first
  //       last
  //     }
  //   }
  // `
  // const response = await useQuery(client, USER_QUERY)
  // console.log(response.data.userList)

  // const CREATE_USER_MUTATION = gql`
  //   mutation {
  //     createUser(input: {
  //       email: "test@gmail.com"
  //       first: "test"
  //       last: "testing"
  //       username: "test"
  //       password: "Test123!"
  //       birthdate: "1998-09-18T21:26:17Z"
  //     }){
  //       id
  //     }
  //   }
  // `

  // const response = await useMutation(client, CREATE_USER_MUTATION)
  // console.log(response.data)
  // const testUserId = response.data.createUser.id
  // const testUserId = '5f2302eae6ce75b654600f74'
  // console.log(testUserId)

  // const variables = {
  //   name: "Test Temp Shoe",
  //   type: 'SHOE',
  //   limit: { value: 300.0, unit: 'MI' },
  //   ownerId: "5f2302eae6ce75b654600f74"
  // }

  // const CREATE_EQUIPMENT_MUTATION = gql`
  //   mutation CreateEquipment($input: CreateEquipmentInput!){
  //     createEquipment(input: $input) {
  //       id
  //       name
  //       limit {
  //         value
  //         unit
  //       }
  //       usage {
  //         unit
  //         value
  //       }
  //       owner {
  //         id
  //         username
  //       }
  //     }
  //   }
  // `

  // const CREATE_EQUIPMENT_MUTATION = gql`
  //   mutation {
  //     createEquipment(input: {
  //       name: "Mutation Shoe"
  //       type: SHOE
  //       limit: { value: 300.0 unit: MI }
  //       ownerId: "5f2302eae6ce75b654600f74"
  //     }) {
  //       id
  //       name
  //       limit {
  //         value
  //         unit
  //       }
  //       usage {
  //         unit
  //         value
  //       }
  //       owner {
  //         id
  //         username
  //       }
  //     }
  //   }
  // `

  // const [createEquipment, { data }] = useMutation(client, CREATE_EQUIPMENT_MUTATION)
  // createEquipment({
  //   variables: {
  //     name: 'Test Temp Jest Shoe',
  //     type: 'SHOE',
  //     limit: { value: 300.0, unit: 'MI' },
  //     ownerId: '5f2302eae6ce75b654600f74'
  //   }
  // })
  // console.log(data)

  // const response = await useMutation(client, CREATE_EQUIPMENT_MUTATION,
  //   {
  //     input: {
  //       name: 'SHoE TesT muTation',
  //       type: 'SHOE',
  //       limit: { value: 300.0, unit: 'MI' },
  //       ownerId: testUserId
  //     }
  //   }
  // )
  // console.log(response)
}

tempQuery()

import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import mongoose from 'mongoose'
import ApolloClient from 'apollo-client'

const getClient = () => {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:4000/graphql',
      fetch: fetch
    }),
    cache: new InMemoryCache()
  })
  return client
}

const useQuery = async (client, query, variables) => {
  try {
    const result = await client
      .query({
        query: query,
        variables: variables
      })
    return result
  } catch (error) {
    console.log('Query failed', error)
  }
}

const useMutation = async (client, mutation, variables) => {
  try {
    const result = await client
      .mutate({
        mutation: mutation,
        variables: variables
      })
    return result
  } catch (error) {
    console.log('Mutation failed', error)
  }
}

const connectDatabase = async () => {
  const uri = 'mongodb://localhost:27017/testDB'
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
  return await mongoose.connect(uri, options)
}

const clearDatabase = async () => {
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany()
  }
  return await mongoose.connection.db.collections.length
}

const teardownDatabase = async () => {
  await connectDatabase()
  await clearDatabase()
}
export { getClient, useQuery, useMutation, teardownDatabase }

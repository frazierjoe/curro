import fetch from 'node-fetch'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

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
    return {
      "data": {
        "errors": error
      }
    }
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
    return {
      "data": {
        "errors": error
      }
    }
  }
}

export { getClient, useQuery, useMutation }

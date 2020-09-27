import { ApolloServer } from 'apollo-server-express'
import http from 'http'
import mongoose from 'mongoose'
import express from 'express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD } from './config'

/*
  Self-invoking asynchronous function
*/
(async () => {
  try {
    // MongoDB on Atlas
    // const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

    // Local MongoDB
    const uri = 'mongodb://localhost:27017/testDB'
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }

    await mongoose.connect(uri, options).then(() => {
      console.log('Connected to MongoDB...')
    })

    const app = express()

    app.disable('x-powered-by')

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      playground: !IN_PROD
    })

    server.applyMiddleware({ app })

    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)

    httpServer.listen({ port: APP_PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
      console.log(`🚀 Subscriptions ready at ws://localhost:${APP_PORT}${server.subscriptionsPath}`)
    })
  } catch (e) {
    console.error(e)
  }
})()

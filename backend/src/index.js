import http from 'http'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { APP_PORT, IN_PROD, SESS_NAME, 
         SESS_SECRET, SESS_LIFETIME, 
         REDIS_HOST, REDIS_PORT, REDIS_PASSWORD 
        } from './config'
        

(async () => {
  try {
    // MongoDB on Atlas
    // const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

    // Local MongoDB
    const uri = 'mongodb+srv://admin:Dingus123@dev.3367y.mongodb.net/dev?retryWrites=true&w=majority'
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

    const RedisStore = connectRedis(session)

    const redisClient = redis.createClient({
      port : 18222,
      host: 'redis-18222.c83.us-east-1-2.ec2.cloud.redislabs.com',
      password: 'NMpyxH3cducHOPb3K4ak8VO5PSvvTtAr'
    })

    const store = new RedisStore({
      client: redisClient
    })

    app.use(
      session({
        store,
        name: SESS_NAME,
        secret: SESS_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: SESS_LIFETIME,
          sameSite: true,
          secure: IN_PROD
        }
    }))

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      cors: false,
      playground: IN_PROD ? true : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
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

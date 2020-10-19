export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'Dingus123',
  DB_HOST = 'curro-cluster-dev.3367y.mongodb.net',
  DB_NAME = 'currodb',

  SESS_NAME = 'sid',
  SESS_SECRET = 'ssh!secret!',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = 'redis-18222.c83.us-east-1-2.ec2.cloud.redislabs.com',
  REDIS_PORT = 18222,
  REDIS_PASSWORD = 'NMpyxH3cducHOPb3K4ak8VO5PSvvTtAr'
} = process.env

export const IN_PROD = NODE_ENV === 'production'

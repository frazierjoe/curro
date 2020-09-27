export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  DB_USERNAME = 'admin',
  DB_PASSWORD = 'Dingus123',
  DB_HOST = 'curro-cluster-dev.3367y.mongodb.net',
  DB_NAME = 'currodb'
} = process.env

export const IN_PROD = NODE_ENV === 'production'

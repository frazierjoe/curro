import { gql } from '@apollo/client';
import { getClient, useMutation } from './server'

const SIGNIN_USER_MUTATION = gql`
  mutation signIn($input: SignInInput!){
    signIn(input: $input){
      id
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!){
    createUser(input: $input){
      id
    }
  }
`;

const SIGNOUT_MUTATION = gql`
  mutation {
    signOut
  }
`;

class Auth {
  constructor() {
    this.authenticated = true;
    this.userId = ""
    this.client = null
  }

  async getAuthClient(){
    if(this.client === null){
      this.client = await getClient()
    }
    return this.client
  }

  async login(cb, userInput) {
     let client = await this.getAuthClient()

    const userResponse = await useMutation(client, SIGNIN_USER_MUTATION, userInput)

    if(userResponse.data.errors) {    
      return userResponse.data.errors.message
    } else {
      const user = userResponse.data.signIn
      this.userId = user.id
      this.authenticated = true;
      cb();
    }
  }

  async createUser(cb, userInput) {
    let client = await this.getAuthClient()

    const userResponse = await useMutation(client, CREATE_USER_MUTATION, userInput)

    if(userResponse.errors) {
      return userResponse.data.errors.message
    } else {
      const user = userResponse.data.createUser
      this.userId = user.id
      this.authenticated = true;
      cb();
    }
  }

  async logout(cb) {
    this.authenticated = false;
    this.userId = ""
    let client = await this.getAuthClient()
    const userResponse = await useMutation(client, SIGNOUT_MUTATION)
    if(userResponse.errors) {
      console.log(userResponse.data.errors.message)
    } 
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
  getUserId() {
    return this.userId
  }
}

// Export exactly 1 instance to follow Singelton pattern
export default new Auth();
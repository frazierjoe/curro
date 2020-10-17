import { gql } from '@apollo/client';
import { getClient, useMutation } from './server'

let client


const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!){
    createUser(input: $input){
      id
    }
  }
`;

class Auth {
  constructor() {
    this.authenticated = true;
  }

  async login(cb, userInput) {

    client = await getClient()
    console.log(userInput)
    // TODO hook up api call
    var loginSuccess = true
    var errorMessage = "Invalid email or password"

    if(loginSuccess) {
      this.authenticated = true;
      cb();
    } else {
      return errorMessage
    }
  }

  async createUser(cb, userInput) {
    client = await getClient()

    var createUserSuccess = true
    var errorMessage = "Unable to create account for user"    

    console.log(client)
    const userResponse = await useMutation(client, CREATE_USER_MUTATION, userInput)
    console.log(userResponse)
    // const testUser = userResponse.data.createUser
 
    if(createUserSuccess) {
      this.authenticated = true;
      cb();
    } else {
      return errorMessage
    }
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

// Export exactly 1 instance to follow Singelton pattern
export default new Auth();
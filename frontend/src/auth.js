class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    var loginSuccess = true
    var errorMessage = "Invalid email or password"

    if(loginSuccess) {
      this.authenticated = true;
      cb();
    } else {
      return errorMessage
    }
  }

  createUser(cb) {
    var createUserSuccess = true
    var errorMessage = "Unable to create account for user"

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
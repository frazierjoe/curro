class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    var loginSuccess = false
    var errorMessage = "Invalid email or password"

    if(loginSuccess) {
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
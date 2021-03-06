import React, { useReducer, createContext } from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null
}

if(localStorage.getItem("token")){
  const decodedToken = jwtDecode(localStorage.getItem("token"))
  initialState.user = decodedToken
} else {
  initialState.user = null
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
})

function authReducer(state, action){
  switch(action.type){
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
const AuthProvider = props => {

  const [state, dispatch] = useReducer(authReducer, initialState)

  function login(userData){
    localStorage.setItem("token", userData.token)
    const decodedToken = jwtDecode(localStorage.getItem("token"))

    dispatch({
      type: 'LOGIN',
      payload: decodedToken
    })
  }

  function logout(){
    localStorage.removeItem('token')
    dispatch({type: 'LOGOUT'})
  }

  return (
    <AuthContext.Provider
      value={{user: state.user, login, logout}}
      {...props}
    />
  )
  
}
export { AuthContext, AuthProvider }
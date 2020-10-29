import React, { useContext } from 'react';
import { AuthContext } from './auth';
import { Route, Redirect } from 'react-router-dom';



export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, logout } = useContext(AuthContext)

  return (
    <Route {...rest} render={
      (props) => {
        if (user ? true : false) {
          return <Component {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}
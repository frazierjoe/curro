import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';


export const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={
      (props) => {
        if(auth.isAuthenticated()){
          console.log("authed")
          console.log(auth)
          return <Component {...props} />
        } else {
          console.log(auth)
          return <Redirect to={
            {
              pathname: '/',
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
import React from 'react';
import './App.css';
import { AuthProvider } from './auth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar/Calendar';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile/Profile';
import { Settings } from './pages/Settings';
import { PageNotFound } from './pages/PageNotFound';
import { ProtectedRoute } from './protected.route';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount'
import Header from './components/Header';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Connect to deployed backend if in production. Else localhost.
let uri = 'http://localhost:4000/graphql';
if (process.env.NODE_ENV === 'production'){
  uri = 'https://curro-api.herokuapp.com/graphql';
}

// Todo: Delete later
uri = 'https://curro-api.herokuapp.com/graphql';

const httpLink = createHttpLink({
  uri: uri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ?  token : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

var theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DC1E65'
    },
    secondary: {
      main: '#8B51FF'
    },
    background: {
      main: '#fafafa',
    }
  },
  overrides: {
    MuiInput: {
      underline: {  
        '&:after': {
          borderBottom: '2px solid #8B51FF',
        },
        '&$focused:after': {
          borderBottomColor: '#8B51FF',
        },
      },
    }
  }
});
theme = responsiveFontSizes(theme);

function App() {

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Header/>
            <Switch>
              <Route exact path='/' component={ Home }/>
              <Route exact path='/home' component={ Home }/>
              <Route exact path='/login' component={ Login }/>
              <Route exact path='/create' component={ CreateAccount }/>
              <Route exact path='/createAccount' component={ CreateAccount }/>
              <ProtectedRoute exact path='/calendar' component={ Calendar }/>
              <ProtectedRoute exact path='/cal' component={ Calendar }/>
              <ProtectedRoute exact path='/feed' component={ Feed }/>
              <ProtectedRoute exact path='/newsfeed' component={ Feed }/>
              <ProtectedRoute exact path='/profile' component={ Profile }/>
              <ProtectedRoute exact path='/setting' component={ Settings }/>
              <ProtectedRoute exact path='/settings' component={ Settings }/>
              <Route exact path='/error' component={ PageNotFound }/>
              <Route exact path='/404' component={ PageNotFound }/>
              <Route exact path='*' component={ PageNotFound }/>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile/Profile';
import { Settings } from './pages/Settings';
import { PageNotFound } from './pages/PageNotFound';
import { ProtectedRoute } from './protected.route';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount'
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DC1E65'
    },
    secondary: {
      main: '#8B51FF'
    }
  },
});

function App() {

  return (
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
  );
}
export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { PageNotFound } from './pages/PageNotFound';
import { ProtectedRoute } from './protected.route';
import Header from './components/Header';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/home' component={ Home }/>
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
    </div>
  );
}

export default App;

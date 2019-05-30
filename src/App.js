import React, { Component } from 'react'
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './Login/login'
import Register from './Register/register'
import Dashboard from './Dashboard/dashboard'
import  Explore from './Explore/explore'
import  MovieDetails from './MovieDetails/moviedetails'

class App extends Component {
  render() {
    return (
       /* Navigate to respective pages */
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/movies/:id" component={MovieDetails} exact />
        <Route path="/explore" component={Explore} exact/>
        </Switch>
      </BrowserRouter>
      );
  } 
}

export default App;
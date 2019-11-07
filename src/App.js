import React, {Component} from 'react';
import './App.css';
import Login from './components/Login'
import Profile from './components/Profile'
import {AuthContextProvider} from './context/AuthContext'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render(){
    return(
      <AuthContextProvider>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <h1>Auth JWT </h1>
              <Route path='/' exact component={Login} />
              <ProtectedRoute path='/profile' exact component={Profile} />
            </header>
          </div>
        </BrowserRouter>
      </AuthContextProvider>
    );
  }
}

export default App;

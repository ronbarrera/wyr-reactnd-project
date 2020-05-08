import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import NavBar from './NavBar'
import HomePage from './HomePage'
import NewQuestionPage from './NewQuestionPage'
import LeaderboardPage from './LeaderboardPage'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginPage from './LoginPage'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    console.log('this is App.js')
    console.log(this.props.authedUser)
    return (
      <Router>
          <NavBar />
            <PublicRoute restricted={true} component={LoginPage} path="/login" exact /> 
            <PrivateRoute component={HomePage} path="/" exact />
            <PrivateRoute component={NewQuestionPage} path="/add" exact />
            <PrivateRoute component={LeaderboardPage} path="/leaderboard" exact />
      </Router>
    )
  }
}

export default connect()(App)

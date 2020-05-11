import React, { Component, Fragment } from 'react'
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
import QuestionDetailsPage from './QuestionDetailsPage'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <NavBar />
        <PublicRoute restricted={true} component={LoginPage} path="/login" exact /> 
        <PrivateRoute component={HomePage} path="/" exact />
        <PrivateRoute component={NewQuestionPage} path="/add" exact />
        <PrivateRoute component={LeaderboardPage} path="/leaderboard" exact />
        <PrivateRoute component={QuestionDetailsPage} path="/questions/:id" exact />
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import NavBar from './NavBar'
import HomePage from './HomePage'
import NewQuestionPage from './NewQuestionPage'
import LeaderboardPage from './LeaderboardPage'
import PrivateRoute from './PrivateRoute';
import LoginPage from './LoginPage'
import QuestionDetailsPage from './QuestionDetailsPage'
import NotFound404 from './NotFound404'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute component={HomePage} path="/" exact />
          <PrivateRoute component={NewQuestionPage} path="/add" />
          <PrivateRoute component={LeaderboardPage} path="/leaderboard" />
          <PrivateRoute component={QuestionDetailsPage} path="/questions/:id" />
          <PrivateRoute component={NotFound404} path='*' /> 
        </Switch>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser}) {
  return {
    authedUser, 
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)

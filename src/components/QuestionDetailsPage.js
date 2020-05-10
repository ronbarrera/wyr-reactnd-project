import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBView, MDBMask, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, } from "mdbreact"
import QuestionForm from './QuestionForm'
import QuestionResults from './QuestionResults'
import { handleSubmitAnswer } from '../actions/shared'


class QuestionDetailsPage extends Component {
  
  handleAnswer = (answer) => {
    const { authedUser, dispatch, qid } = this.props
    dispatch(handleSubmitAnswer({
      authedUser, 
      qid, 
      answer
    }))
  }
  
  render() {
    const isAnswered = this.props.isAnswered
  
    return (
      <MDBView id='main-container'>
        <MDBMask overlay='indigo-strong' />
        {isAnswered 
        ? 
          <QuestionResults data={this.props} />
        :
          <QuestionForm submit={this.handleAnswer} data={this.props} />
        }
      </MDBView>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const { id } = props.match.params
  const question = questions[id]
  const userAnswers = Object.keys(users[authedUser].answers)
  
  return { 
    authedUser,
    qid : id,
    isAnswered : userAnswers.includes(id),
    option: users[authedUser].answers[id],
    question: question,
    user: users[question.author]
  }
}

export default connect(mapStateToProps)(QuestionDetailsPage)
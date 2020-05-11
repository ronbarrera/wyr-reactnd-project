import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MDBView, MDBMask } from "mdbreact"
import QuestionForm from './QuestionForm'
import QuestionResults from './QuestionResults'
import { handleSubmitAnswer } from '../actions/shared'
import NotFound404 from './NotFound404'


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
    const { question } = this.props
    if (question === null) {
      return (<NotFound404 />)
    }
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
  console.log(question)
  const userAnswers = Object.keys(users[authedUser].answers)
  
  return { 
    authedUser,
    qid : id,
    isAnswered : userAnswers.includes(id),
    option: users[authedUser].answers[id],
    question: !question ? null : question,
    user: !question ? null : users[question.author]
  }
}

export default connect(mapStateToProps)(QuestionDetailsPage)


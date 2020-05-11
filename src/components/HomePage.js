import React, { Component } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBView, MDBMask, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBCardText, MDBCard, MDBBtn } from "mdbreact"
import QuestionCard from './QuestionCard'

class HomePage extends Component {
state = {
  activeTab: "1",
}

toggleTab = tab => () => {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
  })}
}

render() {
  var questions = {}
  var userAnswers = []
  var unanswered = []
  var answered = []

  const user = this.props.user
  if(user !== null) {
    questions = this.props.questions
    userAnswers = Object.keys(user.answers)
    unanswered = questions.filter((question) => !userAnswers.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);
    answered = questions.filter((question) => userAnswers.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);
  }

  return (
     <MDBView id='main-container'>
      <MDBMask overlay='indigo-strong'/>
      <MDBContainer style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        <div className="classic-tabs">
          <MDBNav classicTabs className="nav-justified">
            <MDBNavItem>
              <MDBNavLink link to="#" active={this.state.activeTab === "1"} onClick={this.toggleTab("1")}>
                Unanswered Questions
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink link to="#" active={this.state.activeTab === "2"} onClick={this.toggleTab("2")}>
                Answered Questions
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>

          <MDBTabContent 
            className="card gray-bg"
            activeItem={this.state.activeTab} >
            <MDBTabPane tabId="1" className='w-responsive mx-auto'>
            {unanswered.length === 0 && (<MDBCard className="center m-auto p-4" style={{width: "fit-content"}}>
              <MDBCardText className="p-4">
                <strong>You have answered all question</strong>
              </MDBCardText>
              <Link to='/add'>
                <MDBBtn outline color="secondary">Create Question</MDBBtn>
							</Link>
            </MDBCard>)}
             <ul id="questions-list">
              {unanswered.map((question) => (
                <li key={question.id}>
                  <QuestionCard id={question.id}/>
                </li>
              ))}
            </ul>
            </MDBTabPane>
            <MDBTabPane tabId="2" className='w-responsive mx-auto'>
            {answered.length === 0 && (<MDBCard className="center m-auto p-4" style={{width: "fit-content"}}>
              <MDBCardText className="p-4">
                <strong>You have not submitted an answer</strong>
              </MDBCardText>
                <MDBBtn outline color="secondary" onClick={this.toggleTab("1")}>Answer a Question</MDBBtn>
            </MDBCard>)}
            <ul id="questions-list">
              {answered.map((question) => (
                <li key={question.id}>
                  <QuestionCard id={question.id}/>
                </li>
              ))}
            </ul>
            </MDBTabPane>
          </MDBTabContent>
        </div>
      </MDBContainer>
    </MDBView>
    );
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
    authedUser,
    user: !users[authedUser]
      ? null
      : users[authedUser],
    questions: Object.values(questions)
  }
}

export default connect(mapStateToProps)(HomePage)
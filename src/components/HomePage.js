import React, { Component } from "react"
import { connect } from 'react-redux'
import { MDBView, MDBMask, MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, } from "mdbreact"
import Question from './Question'

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
  const  user = this.props.user
  const questions = this.props.questions
  const userAnswers = Object.keys(user.answers)

  const unanswered = questions.filter((question) => !userAnswers.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);
  const answered = questions.filter((question) => userAnswers.includes(question.id)).sort((a, b) => b.timestamp - a.timestamp);
  
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

             <ul id="questions-list">
              {unanswered.map((question) => (
                <li key={question.id}>
                  <Question id={question.id}/>
                </li>
              ))}
            </ul>
            </MDBTabPane>

            <MDBTabPane tabId="2" className='w-responsive mx-auto'>
            <ul id="questions-list">
              {answered.map((question) => (
                <li key={question.id}>
                  <Question id={question.id}/>
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
      ? []
      : users[authedUser],
    questions: Object.values(questions)
  }
}

export default connect(mapStateToProps)(HomePage)
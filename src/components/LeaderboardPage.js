import React, { Component } from "react"
import { connect } from 'react-redux'
import UserScoreCard from './UserScoreCard'
import { MDBView, MDBMask, MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBBtn, MDBInput } from "mdbreact";

class LeaderboardPage extends Component {
  render() {
    const { leaderboard } = this.props

    return(
      <MDBView id='main-container'>
        <MDBMask overlay='indigo-strong' />
        <MDBContainer
          style={{ height: '100%', width: '100%', paddingTop: '6rem', paddingBottom: '5rem' }}
          className='d-flex justify-content-center align-items-center m-auto' >
          <MDBCard className="w-responsive mx-auto">
            <MDBCardHeader className="center mb-4" color="black"><strong style={{fontSize: "1.5rem"}}>Leaderboard</strong></MDBCardHeader>
            <ul id="questions-list">
              {leaderboard.map((user, i) => (
                <li key={user.id}>
                  <UserScoreCard user={user} rank={(i+1)} />
                </li>
              ))}
            </ul>
          </MDBCard>
        </MDBContainer>
      </MDBView>
    )
  }
}

function mapStateToProps ({ users }) {
  const leaderboard = Object.values(users).map((user) => {
    const totalAnswers = Object.keys(user.answers).length
    const totalQuestions = user.questions.length
    return {
      id: user.id, 
      name: user.name, 
      avatarURL: user.avatarURL, 
      totalAnswers: totalAnswers,
      totalQuestions: totalQuestions, 
      score: totalAnswers + totalQuestions
    };
  }).sort((a,b) => b.score - a.score)
  return {
    leaderboard
  }
}

export default connect(mapStateToProps)(LeaderboardPage)




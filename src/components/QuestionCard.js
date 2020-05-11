import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBBtn, MDBRow, MDBCol, MDBAvatar } from "mdbreact";

class QuestionCard extends Component {
  render() {
    const { question } = this.props
    const { id, name, avatarURL, option } = question
    
    return(
      <MDBCard className="w-responsive mx-auto">
      <MDBCardHeader color="black">{name} asks:</MDBCardHeader>
      <MDBCardBody>
        <MDBRow>
          <MDBCol md="4" className="m-auto">
              <MDBAvatar
                style={{width: '5rem', heigth: '5rem'}}
                tag="img"
                src={avatarURL}
                className="rounded-circle m-auto"
                alt="user avatar"
              />
          </MDBCol>
          <MDBCol md="8" className="center">
            <MDBCardText><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>Would you rather</strong></MDBCardText>
            <MDBCardText style={{color: 'black'}}>...{option}...</MDBCardText>
            <Link to={`/questions/${id}`}>
              <MDBBtn className="w-75" outline color="secondary">View Poll</MDBBtn>
            </Link>
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]
  const user = users[question.author]

  const name = user.name
  const avatarURL = user.avatarURL
  const option = question.optionOne.text
  return {
    authedUser, 
    question: question
    ? { id, name, avatarURL, option }
    : null
  }
}

export default connect(mapStateToProps)(QuestionCard)





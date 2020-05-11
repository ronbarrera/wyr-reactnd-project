import React from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBIcon, MDBRow, MDBCol, MDBAvatar, MDBBadge } from "mdbreact";

export default function UserScoreCard (props) {
  const user = props.user
  const rank = props.rank
  const hexColor = (rank === 1 ? "#FFD700" : (rank ===2 ? "#AAA9AD" : "#CD7F32"))

  return (
      <MDBCard className="w-responsive mx-auto">
        <div style={{  position: "relative"}}>
        <MDBCardBody>
          <MDBRow >
            <MDBCol md="4" className="m-auto">
                <MDBAvatar
                  style={{width: '5rem', heigth: '5rem'}}
                  tag="img"
                  src={user.avatarURL}
                  className="rounded-circle m-auto"
                  alt="user avatar"
                />
            </MDBCol>
            <MDBCol md="5">
              <MDBCardText className="center"><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>{user.name}</strong></MDBCardText>
              <p><span className="left">Answered questions</span><span className="right">{user.totalAnswers}</span>​</p>
              <hr />
              <p><span className="left">Created questions</span><span className="right">{user.totalQuestions}</span>​</p>
            </MDBCol>
            <MDBCol md="3" className="m-auto center">
            <MDBContainer className="question-result-bg" style={{width: 'fit-content'}}>
            <MDBCardText><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>Score</strong></MDBCardText>
            <MDBBadge pill color="secondary" style={{ fontSize: "2rem"}} >{user.score}</MDBBadge>
            </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
        {(rank === 1 || rank === 2 || rank === 3)  && (<MDBIcon style={{color: `${hexColor}`}}className="trophy-icon" icon="trophy" />)}
      </div>
    </MDBCard>
  )
}
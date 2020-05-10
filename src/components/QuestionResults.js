import React from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBRow, MDBCol, MDBAvatar, MDBProgress, MDBBadge } from "mdbreact";


export default function QuestionResults (props) {
  const user = props.data.user
  const question = props.data.question
  const option = props.data.option
  const optionOne = props.data.question.optionOne.text
  const optionTwo = props.data.question.optionTwo.text

  const optionOneVotes = question.optionOne.votes.length
  const optionTwoVotes = question.optionTwo.votes.length
  const totalVotes = optionOneVotes + optionTwoVotes
  const optionOnePercentage = Math.round((optionOneVotes/totalVotes) * 100)
  const optionTwoPercentage = Math.round((optionTwoVotes/totalVotes) * 100)

  return (
    <MDBContainer
      style={{ height: '100%', width: '100%', paddingTop: '8rem', paddingBottom: '5rem' }}
      className='d-flex justify-content-center align-items-center m-auto' >
      <MDBCard style={{width: '60%'}}>
        <MDBCardHeader color="black">Asked by {user.name}</MDBCardHeader>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="4" className="m-auto">
                <MDBAvatar
                  style={{width: '7rem', heigth: '7rem'}}
                  tag="img"
                  src={user.avatarURL}
                  className="rounded-circle m-auto"
                  alt="user avatar"
                />
              </MDBCol>
              <MDBCol md="8" >
                <MDBCardText className="center"><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>Would you rather</strong></MDBCardText>
                <MDBContainer className="question-result-bg">
                  <p><strong>{optionOne}</strong></p>
                  <div style={{  position: "relative"}}>
                   <MDBProgress material animated={optionOneVotes > optionTwoVotes} value={optionOnePercentage} height="30px">
                      {optionOnePercentage}%
                    </MDBProgress>
                    {option === 'optionOne' && (
                      <MDBBadge pill color="secondary" style={{ position: "absolute", top: "-10px", right: "-20px", fontSize: "1rem"}} >Your Vote</MDBBadge>
                    )}
                  </div>
                  <p className="center mb-0"><strong>{optionOneVotes} out of {totalVotes} votes</strong></p>
                </MDBContainer>
                <br />
                <MDBContainer className="question-result-bg">
                  <p><strong>{optionTwo}</strong></p>
                  <div style={{  position: "relative"}}>
                   <MDBProgress material animated={optionTwoVotes > optionOneVotes} value={optionTwoPercentage} height="30px">
                      {optionTwoPercentage}%
                    </MDBProgress>
                    {option === 'optionTwo' && (
                      <MDBBadge pill color="secondary" style={{ position: "absolute", top: "-10px", right: "-20px", fontSize: "1rem"}} >Your Vote</MDBBadge>
                    )}
                  </div>
                  <p className="center mb-0"><strong>{optionTwoVotes} out of {totalVotes} votes</strong></p>
                </MDBContainer>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

// import React from 'react'
// import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBBtn, MDBRow, MDBCol, MDBAvatar, MDBInput } from "mdbreact";


// export default function QuestionResults () {
//   return (
//     <MDBContainer
//           style={{ height: '100%', width: '100%', paddingTop: '8rem', paddingBottom: '5rem' }}
//           className='d-flex justify-content-center align-items-center m-auto' >
//         <MDBCard style={{width: '60%'}}>
//           <MDBCardHeader color="black">Asked by {name}</MDBCardHeader>
//           <MDBCardBody>
//             <MDBRow>
//               <MDBCol md="4" className="m-auto">
//                   <MDBAvatar
//                     style={{width: '5rem', heigth: '5rem'}}
//                     tag="img"
//                     src={avatarURL}
//                     className="rounded-circle m-auto"
//                     alt="user avatar"
//                   />
//               </MDBCol>
//               <MDBCol md="8" >
//                 <MDBCardText className="center"><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>Would you rather</strong></MDBCardText>
//                 <MDBContainer className="m-auto p-3">
//                   <MDBInput onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label={`${optionOne}`} type="radio"
//                     id="radio1" />
//                   <MDBInput onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label={`${optionTwo}`} type="radio"
//                     id="radio2" />
//                 </MDBContainer>
//                 <div className="center">
//                   <MDBBtn className="w-50" outline color="secondary" disabled={this.state.radio === 0} onClick={() => this.props.submit(selection)}>Submit</MDBBtn>
//                 </div>
//               </MDBCol>
//             </MDBRow>
//           </MDBCardBody>
//         </MDBCard>
//       </MDBContainer>
//   )
// }
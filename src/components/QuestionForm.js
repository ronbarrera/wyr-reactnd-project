import React, { Component } from 'react'
import { MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBBtn, MDBRow, MDBCol, MDBAvatar, MDBInput } from "mdbreact";

class QuestionForm extends Component{
  state = {
    radio: 0
  }
  
  onClick = nr => () => {
    this.setState({
      radio: nr
    });
  }

  render() {
    const { data } = this.props
    const selection = this.state.radio === 1 ? 'optionOne' : 'optionTwo'
    
    return (
      <MDBContainer
          style={{ height: '100%', width: '100%', paddingTop: '8rem', paddingBottom: '5rem' }}
          className='d-flex justify-content-center align-items-center m-auto' >
        <MDBCard className="w-responsive mx-auto">
          <MDBCardHeader color="black">{data.user.name} asks:</MDBCardHeader>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="4" className="m-auto">
                  <MDBAvatar
                    style={{width: '5rem', heigth: '5rem'}}
                    tag="img"
                    src={data.user.avatarURL}
                    className="rounded-circle m-auto"
                    alt="user avatar"
                  />
              </MDBCol>
              <MDBCol md="8" >
                <MDBCardText className="center"><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>Would you rather</strong></MDBCardText>
                <MDBContainer className="m-auto p-3">
                  <MDBInput onClick={this.onClick(1)} checked={this.state.radio===1 ? true : false} label={`${data.question.optionOne.text}`} type="radio"
                    id="radio1" />
                  <MDBInput onClick={this.onClick(2)} checked={this.state.radio===2 ? true : false} label={`${data.question.optionTwo.text}`} type="radio"
                    id="radio2" />
                </MDBContainer>
                <div className="center">
                  <MDBBtn className="w-75" outline color="secondary" disabled={this.state.radio === 0} onClick={() => this.props.submit(selection)}>Submit</MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    )
  }
}

export default QuestionForm


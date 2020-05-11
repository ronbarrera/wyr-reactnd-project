import React, { Component } from "react"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import { MDBView, MDBMask, MDBContainer, MDBCard, MDBCardBody, MDBCardText, MDBCardHeader, MDBBtn, MDBInput } from "mdbreact";

class NewQuestionPage extends Component {
  state = {
    optionOne: '', 
    optionTwo: '', 
    toHome: false,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { optionOne, optionTwo } = this.state
    const { dispatch, id } = this.props
    dispatch(handleAddQuestion({
      optionOne, 
      optionTwo
    }))
    this.setState(() => ({
      optionOne: '', 
      optionTwo: '',
      toHome: id ? false : true,
    }))
  }
  
  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return(
      <MDBView id='main-container'>
        <MDBMask overlay='indigo-strong' />
        <MDBContainer
          style={{ height: '100%', width: '100%', paddingTop: '6rem', paddingBottom: '5rem' }}
          className='d-flex justify-content-center align-items-center m-auto' >
        <MDBCard className="w-responsive mx-auto">
          <MDBCardHeader className="center" color="black"><strong style={{fontSize: "1.5rem"}}>Create New Question</strong></MDBCardHeader>
          <MDBCardBody>
          <MDBCardText><strong style={{color: 'black'}}>Complete the question: </strong></MDBCardText>
          <MDBCardText><strong  style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>Would you rather</strong></MDBCardText>
          <form onSubmit={this.handleSubmit} >
            <div className="grey-text">
              <MDBInput
                outline
                name="optionOne"
                label="Enter Option One Text Here"
                group
                type="text"
                value={optionOne}
                onChange={this.handleChange}
              />
              <MDBCardText className="center m-0"><strong style={{color: 'black', fontFamily: 'Marker Felt', fontSize: '1.25rem'}}>OR</strong></MDBCardText>
              <MDBInput
                outline
                name="optionTwo"
                label="Enter Option Two Text Here"
                group
                type="text"
                value={optionTwo}
                onChange={this.handleChange}
              />
            </div>
            <div className="text-center mt-4">
              <MDBBtn
                outline
                color="secondary"
                className="w-75"
                type="submit" 
                disabled={optionOne === '' || optionTwo === ''}>
                  Submit
                </MDBBtn>
            </div>
          </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
      
      </MDBView>
    )
  }
}

export default connect()(NewQuestionPage)
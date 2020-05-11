import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { MDBMask, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBSelect, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../assets/logo.svg';

class SignInView extends Component {
  state = {
    userSelected: undefined,
    redirectToReferrer: false,
  }

  handleChange = (userSelected) => {
    this.setState(() => ({
      userSelected: userSelected[0],
    }))
  }

  handleSignIn = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(this.state.userSelected))  
    this.setState(() => ({
      redirectToReferrer: true,
    }))
  }

  render() {
    const { userSelected, redirectToReferrer } = this.state
    const userOptions = this.props.users
    const { from } = this.props.location.state || { from : { pathname: '/' } }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
        <MDBView id='main-container'>
          <MDBMask overlay='indigo-strong' />
          <MDBContainer id="loginpageview"
            style={{ height: '100%', width: '100%', paddingTop: '8rem', paddingBottom: '5rem' }}
            className='d-flex justify-content-center align-items-center' >
            <MDBCard className='dark-grey-text center'>
              <div className='center'>
                <h3>
                  <strong>Welcome to Would You Rather App!</strong>
                </h3>
                <h5>Please sign in to continue</h5>
              </div>
              <MDBCardBody className='z-depth-2'>
                <img src={logo} alt="Logo" />
                <MDBSelect
                  options={userOptions}
                  selected="Choose your user"
                  label="Select User"
                  value={userSelected}
                  getValue={this.handleChange}
                />
                <MDBBtn rounded color="secondary" disabled={userSelected === undefined} onClick={this.handleSignIn}>Sign In</MDBBtn>
              </MDBCardBody>
              </MDBCard>
          </MDBContainer>
        </MDBView>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users: Object.values(users).map(user => ({text: user.name, value: user.id}))
  }
}

export default connect(mapStateToProps)(SignInView)
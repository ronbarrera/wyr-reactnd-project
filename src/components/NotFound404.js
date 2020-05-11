import React from 'react'
import { withRouter } from 'react-router-dom';
import { MDBView, MDBContainer, MDBBtn } from "mdbreact"


const NotFound404 = (props) => {

  return (
    <MDBView id='main-container'>
    <MDBContainer className="center" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
    <div className="question-result-bg ">
    <h4>404 - Page Not Found</h4>
    <p>The requested URL was not found</p>
    <MDBBtn outline color="secondary" onClick={() => props.history.push('/')}>Go to Home Page</MDBBtn>
    </div>
    </MDBContainer>
    </MDBView>
  )
}

export default withRouter(NotFound404);
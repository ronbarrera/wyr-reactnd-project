import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PublicRoute = ({ authedUser, component: Component, restricted, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      (authedUser !== null) && restricted 
			? <Redirect to="/" />
      : <Component />
    )} />
  )
}

function mapStateToProps ({ authedUser }) {
  return {
  	authedUser
  }
}
  
export default connect(mapStateToProps) (PublicRoute)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from 'mdbreact'
import LoadingBar from 'react-redux-loading-bar'
import { withRouter } from 'react-router-dom'

class NavBar extends Component {
  state = {
    isOpen: false, 
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleLogOut = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null)) 
    this.props.history.push(`/`)
  }
  
  render() {
    return (
      <MDBNavbar color="black" fixed="top" dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <strong style={{fontFamily: "Marker Felt"}}>WYR?</strong>
          </MDBNavbarBrand> 
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem >
                <MDBNavLink exact to="/"  activeClassName="current">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem >
                <MDBNavLink to="/add" activeClassName="current">New Question</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem >
                <MDBNavLink to="/leaderboard"  activeClassName="current">Leaderboard</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            {this.props.authedUser !== null && (
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink disabled to="#">
                  {this.props.user.name}
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown>
                  <MDBDropdownToggle nav caret className="m-auto p-auto">
                  <img src={this.props.user.avatarURL} className="rounded-circle z-depth-2 m-auto" alt="avatar" height="25"/>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem onClick={this.handleLogOut}>Log Out</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            )}
          </MDBCollapse>
        </MDBContainer>
        <LoadingBar style={{ position: "absolute", bottom: "0", left: "0"}}/>
      </MDBNavbar>
      );
    }
  }

  function mapStateToProps ({ authedUser, users }) {
      return {
      authedUser, 
      user: !users[authedUser]
        ? []
        : users[authedUser]
    }
  }
  
export default withRouter(connect(mapStateToProps)(NavBar))

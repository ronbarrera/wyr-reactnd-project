import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon  } from 'mdbreact'

class NavBar extends Component {
  state = {
    isOpen: false, 
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleSignOut = (e) => {
    e.preventDefault()
    this.props.dispatch(setAuthedUser(null))  
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
                  <MDBDropdownToggle nav caret>
                    <MDBIcon icon="user" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem onClick={this.handleSignOut}>Sign Out</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
            )}
          </MDBCollapse>
        </MDBContainer>
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
  
export default connect(mapStateToProps)(NavBar)

import React from 'react'
import Fire from './Fire'
import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav
 } from 'reactstrap';

class Directory extends React.Component {
  constructor(props) {
    super(props)
    this.toggleNav = this.toggleNav.bind(this)
    this.authListener = this.authListener.bind(this)
    this.renderLoginOptions = this.renderLoginOptions.bind(this);
    this.state = {
      isOpen: false,
      user: {}
    }
  }

  componentDidMount() {
    this.authListener()
  }

  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
  })}

  renderLoginOptions() {
    // A user is logged in if the user object exists in the state 
    return this.state.user ? <LoggedIn /> : <LoggedOut />
  }

  render() {
    return (
      <Navbar className="main-nav" color="dark" dark expand="md" sticky="top">
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {this.renderLoginOptions()}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Directory

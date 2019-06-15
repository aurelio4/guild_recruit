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

  render() {
    return (
      <Navbar className="main-nav" color="dark" dark expand="md" sticky="top">
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          {this.state.user
          ?  <LoggedIn />
          :  <LoggedOut />}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Directory

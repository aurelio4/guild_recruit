import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class Directory extends React.Component {
  constructor(props) {
    super(props)

    this.toggleNav = this.toggleNav.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      isOpen: false,
      modal: false,
      isLoggedIn: true
    }
  }

  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  handleLogin() {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }))
  }

  render() {
    return (
      <Navbar className="main-nav" color="dark" dark expand="md" sticky="top">
        <NavbarToggler onClick={this.toggleNav} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
        {this.state.isLoggedIn
        ?   <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem> Option 1 </DropdownItem>
                <DropdownItem> Option 2 </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogin}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        :   <NavItem>
              <NavLink href="#" onClick={this.handleLogin}>Login</NavLink>
            </NavItem>
        }
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Directory

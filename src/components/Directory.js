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
  DropdownItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
  Form } from 'reactstrap';

class Directory extends React.Component {
  constructor(props) {
    super(props)

    this.toggleNav = this.toggleNav.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      isOpen: false,
      modal: false,
      isLoggedIn: false
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
    console.log(this.state.isLoggedIn)
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
                <DropdownItem> Option 3 </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogin}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        :  [<NavItem>
              <NavLink href="#" onClick={this.handleLogin}>Register</NavLink>
            </NavItem>,
            <NavItem>
              <NavLink href="#" onClick={this.toggleModal}>Login</NavLink>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Input type="username" name="username" placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                      <Input type="password" name="password" placeholder="Password" />
                    </FormGroup>
                  </Form>
                  <Button color="secondary" onClick={() => {
                    this.handleLogin();
                    this.toggleModal();
                  }}> Log in </Button>
                </ModalBody>
              </Modal>
            </NavItem> ]}
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

export default Directory

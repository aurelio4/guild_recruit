import React from 'react'
import Fire from './Fire'
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
  Input,
  FormGroup,
  Form } from 'reactstrap';

class Directory extends React.Component {
  constructor(props) {
    super(props)

    this.toggleNav = this.toggleNav.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.authListener = this.authListener.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this)
    this.state = {
      isOpen: false,
      loginModal: false,
      registerModal: false,
      isLoggedIn: false,
      user: {}
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  login(e) {
    e.preventDefault()
    Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  }

  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleLoginModal() {
    this.setState(prevState => ({
      loginModal: !prevState.loginModal
    }))
  }

  toggleRegisterModal() {
    this.setState(prevState => ({
      registerModal: !prevState.registerModal
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
                <DropdownItem> Option 3 </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleLogin}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
        :  [<NavItem>
              <NavLink href="#" onClick={this.toggleRegisterModal}> Register </NavLink>
                <Modal isOpen={this.state.registerModal} toggle={this.toggleRegisterModal}>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Input type="username" name="username" placeholder="Username" />
                      </FormGroup>
                      <FormGroup>
                        <Input type="email" name="email" placeholder="Email" />
                      </FormGroup>
                      <FormGroup>
                        <Input type="password" name="password" placeholder="Password" />
                      </FormGroup>
                      <FormGroup>
                        <Input type="password" name="password" placeholder="Verify Password" />
                      </FormGroup>
                    </Form>
                    <Button color="secondary"> Register </Button>
                  </ModalBody>
                </Modal>
            </NavItem>,
            <NavItem>
              <NavLink href="#" onClick={this.toggleLoginModal}> Login </NavLink>
              <Modal isOpen={this.state.loginModal} toggle={this.toggleLoginModal}>
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
                    this.toggleLoginModal();
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

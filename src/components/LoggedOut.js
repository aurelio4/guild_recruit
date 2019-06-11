import React from 'react'
import Fire from './Fire'
import {
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  Input,
  FormGroup,
  Form } from 'reactstrap';


class LoggedOut extends React.Component {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
    this.signup = this.signup.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this)

    this.state = {
      loginModal: false,
      registerModal: false,
      username: '',
      email: '',
      password: ''
    }
  }

  login(e) {
    Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {}).catch((error) => {
        console.log(error);
      })
  }

  signup(e) {
    Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        console.log(error);
      })
    Fire.firestore().collection('users').doc(this.state.email).set({
      email: this.state.email,
      username: this.state.username
    }).then(() => {
      console.log("Document successfully written!")
    }).catch(err => {
      console.log("Error writing document: ", err)
    })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

  render() {
    return([
      <NavItem>
        <NavLink href="#" onClick={this.toggleRegisterModal}> Register </NavLink>
        <Modal isOpen={this.state.registerModal} toggle={this.toggleRegisterModal}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input type="username" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </FormGroup>
            </Form>
            <Button className="btn-float-r" color="secondary" onClick={() => {
              this.signup();
              this.toggleRegisterModal();
            }}> Register </Button>
          </ModalBody>
        </Modal>
      </NavItem>,
      <NavItem>
        <NavLink href="#" onClick={this.toggleLoginModal}> Login </NavLink>
        <Modal isOpen={this.state.loginModal} toggle={this.toggleLoginModal}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
            </FormGroup>
          </Form>
          <Button className="btn-float-r" color="secondary" onClick={() => {
              this.login();
              this.toggleRegisterModal();
            }}> Log in </Button>
          <p className="error-message" color="danger">{this.props.error}</p>
        </ModalBody>
        </Modal>
      </NavItem>
      ]
    )
  }
}

export default LoggedOut
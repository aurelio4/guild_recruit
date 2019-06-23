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
  FormText,
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
      discord: '',
      email: '',
      password: '',
      uid: ''
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
      .then(() => {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ uid: userUid })
        Fire.firestore().collection('users').doc(this.state.uid).set({
          username: this.state.username,
          discord: this.state.discord,
          email: this.state.email
        }).then(() => {
          console.log("Document successfully written")
        }).catch((error) => {
          console.log(error);
        })
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
                <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Input type="username" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Input type="text" name="discord" value={this.state.discord} onChange={this.handleChange} placeholder="Discord" />
                <FormText color="muted">
                  Example: chelk#4281
                </FormText>
              </FormGroup>
            </Form>
            <Button className="btn-float-r btn-spacing" color="danger" onClick={this.toggleRegisterModal}>Close</Button>
            <Button className="btn-float-r" color="success" onClick={() => {
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
          <Button className="btn-float-r btn-spacing" color="danger" onClick={this.toggleLoginModal}>Close</Button>
          <Button className="btn-float-r" color="success" onClick={() => {
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
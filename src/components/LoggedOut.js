import React from 'react'
import Fire from './Fire'
import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import {
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  Input,
  FormGroup,
  Form } from 'reactstrap'

class LoggedOut extends React.Component {
  constructor(props) {
    super(props)

    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.toggleRegisterModal = this.toggleRegisterModal.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)

    this.state = {
      loginModal: false,
      registerModal: false,
      uid: ''
    }
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

  closeRegisterModal(data) {
    this.setState({ registerModal: data })
  }

  closeLoginModal(data) {
    this.setState({ loginModal: data })
  }

  render() {
    return([
      <NavItem>
        <NavLink href="#" onClick={this.toggleRegisterModal}> Register </NavLink>
        <RegisterModal key="registerModal" callback={this.closeRegisterModal} isShow={this.state.registerModal}/>
      </NavItem>,
      <NavItem>
        <NavLink href="#" onClick={this.toggleLoginModal}> Login </NavLink>
        <LoginModal key="loginModal" callback={this.closeLoginModal} isShow={this.state.loginModal}/>
      </NavItem>
      ])
  }
}

export default LoggedOut
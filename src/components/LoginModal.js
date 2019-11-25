import React from 'react'
import Fire from './Fire'
import {
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Button } from 'reactstrap'

class LoginModal extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.sendData = this.sendData.bind(this)
        this.login = this.login.bind(this)

        this.state = {
            uid: '',
            email: '',
            password: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login() {
        Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((u) => {}).catch((error) => {
            console.log(error);
          })
      }

    sendData() {
        this.props.callback(false)
    }

    render() {
        return (
        <Modal isOpen={this.props.isShow} toggle={this.sendData}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
            </FormGroup>
          </Form>
          <Button className="btn-float-r btn-spacing" color="danger" onClick={this.sendData}>Close</Button>
          <Button className="btn-float-r" color="success" onClick={this.login}> Log in </Button>
          <p className="error-message" color="danger">{this.props.error}</p>
        </ModalBody>
        </Modal>
        )
    }
}

export default LoginModal
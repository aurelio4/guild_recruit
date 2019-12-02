import React from 'react'
import Fire from './Fire'
import {
    Modal,
    ModalBody,
    Badge,
    Button,
    Input,
    Form,
    FormGroup,
    FormText } from 'reactstrap'

class RegisterModal extends React.Component {
    constructor(props) {
        super(props)

        this.checkPlayerData = this.checkPlayerData.bind(this)
        this.sendData = this.sendData.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            isOpen: this.props.isShow,
            username: '',
            discord: '',
            email: '',
            password: '',
            usernameError: '',
            discordError: '',
            emailError: '',
            passwordError: ''
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    signup() {
        Fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(res => {
            this.setState({ uid: res.user.uid })
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
          .catch((err) => {
            const errorCode = err.code;
            switch(errorCode) {
              case 'auth/weak-password':
                this.setState({ passwordError: "The password is too weak" })    
                break;    
              // Other errors here...
              default:
                // Handle the scenario where an unexpected error occurs -- maybe a badge for "unexpected error" 
                // at the top of the modal?
            }
          })
    }

    checkPlayerData() {
        this.setState({
          usernameError: '',
          discordError: '',
          emailError: '',
          passwordError: ''
        })
    
        if(!this.state.email) {
          this.setState({ emailError: "Email field is empty!" })
        } else if(!this.state.password) {
          this.setState({ passwordError: "Password field is empty!" })
        } else if(!this.state.username) {
          this.setState({ usernameError: "Username field is empty!" })
        } else if(!this.state.discord) {
          this.setState({ discordError: "Discord field is empty!" })
        } else if(this.state.username.length > 14) {
          this.setState({ usernameError: "Username is too long!" })
        } else if(this.state.username.length < 3) {
          this.setState({ usernameError: "Username is too short!" })
        } else {
          this.signup();
        }
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
                <Badge color="danger" className="badge-spacing">{this.state.emailError}</Badge>
                <Input type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Badge color="danger" className="badge-spacing">{this.state.passwordError}</Badge>
                <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Badge color="danger" className="badge-spacing">{this.state.usernameError}</Badge>
                <Input type="username" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <Badge color="danger" className="badge-spacing">{this.state.discordError}</Badge>
                <Input type="text" name="discord" value={this.state.discord} onChange={this.handleChange} placeholder="Discord" />
                <FormText color="muted">
                  Example: chelk#4281
                </FormText>
              </FormGroup>
            </Form>
            <Button className="btn-float-r btn-spacing" color="danger" onClick={this.sendData}>Close</Button>
            <Button className="btn-float-r" color="success" onClick={() => {
              this.checkPlayerData();
            }}> Register </Button>
          </ModalBody>
        </Modal>
        )
    }
}

export default RegisterModal
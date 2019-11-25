import React from 'react'
import Fire from './Fire'
import {
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button } from 'reactstrap'

class ProfileModal extends React.Component {
  constructor(props) {
    super(props)

    this.getUser = this.getUser.bind(this)
    this.sendData = this.sendData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setEditDisabled = this.setEditDisabled.bind(this)

    this.state = {
      editDisabled: true,
      profileUsername: '',
      profileEmail: '',
      profileDiscord: '',
      profileUid: ''
    }
  }

  componentDidMount() {
    this.getUser()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendData() {
    this.props.callback(false)
  }

  setEditDisabled() {
    this.setState(prevState => ({
      editDisabled: !prevState.editDisabled
    }))
  }

  setUserProfile() {
    Fire.firestore().collection('users').doc(this.state.profileUid).set({
      username: this.state.profileUsername,
      discord: this.state.profileDiscord,
      email: this.state.profileEmail
    }).then(() => {
      console.log("Written to Firestore")
    }).catch(err => {
      console.log("Error writing to DB: ", err)
    })
  }

  getUser() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ 
          profileEmail: user.email,
          profileUid: userUid 
        })
        Fire.firestore().collection('users').doc(this.state.profileUid).get().then(doc => {
          if(doc.exists) {
            var data = JSON.stringify(doc.data())
            var user = JSON.parse(data)
            this.setState({ 
              profileUsername: user.username,
              profileDiscord: user.discord
             })
          }
        })
      }
    })
  } 

  render() {
    return(
      <Modal isOpen={this.props.isShow} toggle={this.sendData}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{ color: '#000' }} for="username">Username</Label>
              <Input type="username" name="profileUsername" value={this.state.profileUsername} onChange={this.handleChange} disabled={this.state.editDisabled} />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: '#000' }} for="email">Email</Label>
              <Input type="email" name="email" value={this.state.profileEmail} disabled />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: '#000' }} for="discord">Discord</Label>
              <Input type="text" name="profileDiscord" value={this.state.profileDiscord} onChange={this.handleChange} disabled={this.state.editDisabled} />
              <FormText color="muted">
                Example: chelk#4281
              </FormText>
            </FormGroup>
            <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.sendData}>Close</Button>
            {this.state.editDisabled 
            ? <Button className="btn-float-r btn-spacing" 
                      color="info"
                      onClick={this.setEditDisabled}>
                      Edit
                </Button>
            : <Button className="btn-float-r btn-spacing" 
                      color="success"
                      onClick={() => {this.setEditDisabled(); this.setUserProfile(); this.sendData()}}>
                      Update
              </Button>}
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default ProfileModal
import React from 'react'
import Fire from './Fire'
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Label } from 'reactstrap'

class DeleteProfileModal extends React.Component {
  constructor(props) {
    super(props)

    this.getUser = this.getUser.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteUserProfile = this.deleteUserProfile.bind(this)

    this.state = {
      profileUid: '',
      password: '',
      email: ''
    }
  }

  componentDidMount() {
    this.getUser()
  }

  closeModal() {
    this.props.callback(false)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
}

  getUser() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ 
          profileUid: userUid,
          email: user.email 
        })
      }
    })
  }

  deleteUserProfile() {
    Fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(res => {
      Fire.firestore().collection('guilds').doc(this.state.profileUid).get().then(doc => {
        if(doc.exists) {
          Fire.firestore().collection('guilds').doc(this.state.profileUid).delete()
          console.log("Guild deleted (PROFILE DELETE METHOD)")
        }
      })

      Fire.firestore().collection('users').doc(this.state.profileUid).delete()
      .then(() => {
        console.log("Document deleted successfully")
        Fire.auth().currentUser.delete().then(() => {
          console.log("User deleted successfully")
        }).catch(err => {
          console.log("Error deleting user: ", err)
        })
      }).catch(err => {
        console.log("Error deleting document: ", err)
      })
    }).catch((err) => {
        if(err) {
          console.log(err)
        }
      })
    }
  
  render() {
    return (
      <Modal isOpen={this.props.isModalShow} toggle={this.closeModal}>
        <ModalBody>
          <span className="delete-font">
            Are you sure you want to permanently delete your account? Doing so will delete the following:
            <ul className="no-dots">
              <li> - Guild (If applicable)</li>
              <li> - Guild applications (If applicable)</li>
              <li> - Profile</li>
            </ul>
          </span>
          <Label for="password">Password</Label>
          <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => {this.deleteUserProfile(); this.closeModal()}} disabled={this.state.password.length <= 0 ? true : false}>Delete</Button>
          <Button color="danger" onClick={this.closeModal}>Nevermind</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default DeleteProfileModal
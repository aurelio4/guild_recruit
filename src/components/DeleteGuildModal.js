import React from 'react'
import Fire from './Fire'
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input } from 'reactstrap'

class DeleteGuildModal extends React.Component {
  constructor(props) {
    super(props)

    this.deleteUserGuild = this.deleteUserGuild.bind(this)
    this.getUser = this.getUser.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      profileUid: '',
      deleteGuild: ''
    }
  }

  componentDidMount() {
    this.getUser()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  }

  getUser() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ profileUid: userUid })
      }
    })
  }

  deleteUserGuild() {
    Fire.firestore().collection('guilds').doc(this.state.profileUid).delete()
      .then(() => {
        console.log("Document deleted successfully")
        window.location.reload()
      }).catch(err => {
        console.log("Error deleting document: ", err)
      })
  }

  render() {
    return (
      <Modal isOpen={this.props.isModalShow} toggle={this.props.callback}>
        <ModalBody>
          <span className="delete-font">
          Are you sure you want to permanently delete your guild? Doing so will delete the following:
            <ul className="no-dots">
              <li> - Guild</li>
              <li> - Guild Applications</li>
            </ul>
          Type delete if you wish to proceed
          <Input type="delete" name="deleteGuild" value={this.state.deleteGuild} onChange={this.handleChange} />
          </span>
        </ModalBody>
        <ModalFooter>
          <Button color="success" disabled={(this.state.deleteGuild === 'delete' ? false : true)} onClick={() => {this.deleteUserGuild(); this.props.callback(false)}}>Delete</Button>
          <Button color="danger" onClick={this.props.callback}>Nevermind</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default DeleteGuildModal
import React from 'react'
import Fire from './Fire'
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  NavLink,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.toggleProfile = this.toggleProfile.bind(this)
    this.updateUsername = this.updateUsername.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.setUserProfile = this.setUserProfile.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getUserEmail = this.getUserEmail.bind(this)
    this.finishEdit = this.finishEdit.bind(this)

    this.state = {
      profileModal: false,
      editDisabled: true,
      profileUsername: '',
      profileEmail: '',
      profileDiscord: '',
      playerUid: ''
    }
  }

  componentDidMount() {
    this.getUserEmail()
  }

  logout() {
    Fire.auth().signOut();
  }
  
  startEdit() {
    this.setState({ editDisabled: false })
  }

  finishEdit() {
    this.setState({ editDisabled: true })
  }

  updateUsername(value) {
    this.setState({ profileUsername: value })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggleProfile() {
    this.setState(prevState => ({
      profileModal: !prevState.profileModal
    }))
  }

  getUserEmail() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ profileEmail: user.email })
        this.setState({ playerUid: userUid})
        Fire.firestore().collection('users').doc(this.state.playerUid).get().then(doc => {
          if(doc.exists) {
            var data = JSON.stringify(doc.data())
            var user = JSON.parse(data)
            this.setState({ profileUsername: user.username })
          }
        })
      }
    })
  }

  getUserInfo() {
    const playerInfo = Fire.firestore().collection('users').doc(this.state.playerUid)
    playerInfo.get().then(doc => {
      if(doc.exists) {
        var data = JSON.stringify(doc.data())
        var user = JSON.parse(data)
        this.setState({ profileUsername: user.username })
        this.setState({ profileDiscord: user.discord })
      } else {
        console.log("No such document")
      }
    }).catch((err) => {
      console.log("Error getting document: ", err)
    })
  }

  setUserProfile() {
    Fire.firestore().collection('users').doc(this.state.playerUid).set({
      username: this.state.profileUsername,
      discord: this.state.profileDiscord,
      email: this.state.profileEmail
    }).then(() => {
      console.log("Written to Firestore")
    }).catch(err => {
      console.log("Error writing document: ", err)
    })
  }

  render() {
    return ([
      <NavItem>
        <NavLink href="#" onClick={() => {this.toggleProfile(); this.getUserInfo()}}> {this.state.profileUsername} </NavLink>
        <Modal isOpen={this.state.profileModal} toggle={this.toggleProfile}>
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
              <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.toggleProfile}>Close</Button>
              <Button className="btn-float-r btn-spacing" color="info" onClick={this.startEdit}>Edit</Button>
              <Button className="btn-float-r" color="success" onClick={() => {this.toggleProfile(); this.setUserProfile(); this.finishEdit();}}>Update</Button>
            </Form>
          </ModalBody>
        </Modal>
      </NavItem>,
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem> Add(/edit?) Guild</DropdownItem>
          <DropdownItem> Show Guilds Applied To?</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>]
    )
  }
}

export default LoggedIn
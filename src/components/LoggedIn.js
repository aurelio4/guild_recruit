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
  InputGroup,
  InputGroupButtonDropdown,
  Label,
  Modal,
  ModalBody,
  NavLink,
  NavItem,
  UncontrolledDropdown
} from 'reactstrap'

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
    this.toggleAddGuild = this.toggleAddGuild.bind(this)
    this.addGuildToDB = this.addGuildToDB.bind(this)
    this.toggleServerSelect = this.toggleServerSelect.bind(this)
    this.setRegionEU = this.setRegionEU.bind(this)
    this.setRegionNA = this.setRegionNA.bind(this)

    this.state = {
      profileModal: false,
      addGuildModal: false,
      editDisabled: true,
      profileUsername: '',
      profileEmail: '',
      profileDiscord: '',
      profileUid: '',
      guildName: '',
      guildRegion: '',
      guildServer: '',
      guildDesc: '',
      serverSelect: false
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

  setRegionEU() {
    this.setState({ guildRegion: 'EU'})
  }

  setRegionNA() {
    this.setState({ guildRegion: 'NA' })
  }

  toggleProfile() {
    this.setState(prevState => ({
      profileModal: !prevState.profileModal
    }))
  }

  toggleAddGuild() {
    this.setState(prevState => ({
      addGuildModal: !prevState.addGuildModal
    }))
  }

  toggleServerSelect() {
     this.setState(prevState => ({
      serverSelect: !prevState.serverSelect
    }))
  }

  getUserEmail() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ profileEmail: user.email })
        this.setState({ profileUid: userUid})
        Fire.firestore().collection('users').doc(this.state.profileUid).get().then(doc => {
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
    const playerInfo = Fire.firestore().collection('users').doc(this.state.profileUid)
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
      console.log("Error getting document from DB: ", err)
    })
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

  addGuildToDB() {
    Fire.firestore().collection('guilds').doc(this.state.profileUid)
    .set({
      guildName: this.state.guildName,
      guildServer: this.state.guildServer,
      guildRegion: this.state.guildRegion,
      guildDesc: this.state.guildDesc
    }).then(() => {
      console.log("Successfully written to Firestore")
    }).catch(err => {
      console.log("Error writing to DB: ", err)
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
          <DropdownItem onClick={this.toggleAddGuild}> Add Guild</DropdownItem>
          <Modal isOpen={this.state.addGuildModal} toggle={this.toggleAddGuild}>
            <ModalBody>
            <Form>
              <FormGroup>
                <Label style={{ color: '#000' }} for="guildName">Guild Name</Label>
                <Input type="text" name="guildName" value={this.state.guildName} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#000' }} for="guildServer">Guild Server</Label>
                <InputGroup>
                  <InputGroupButtonDropdown addonType="append" isOpen={this.state.serverSelect} toggle={this.toggleServerSelect}>
                    <DropdownToggle caret>
                      {this.state.guildRegion ? this.state.guildRegion : "Server"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.setRegionEU}>EU</DropdownItem>
                      <DropdownItem onClick={this.setRegionNA}>NA</DropdownItem>
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                  <Input type="text" name="guildServer" value={this.state.guildServer} onChange={this.handleChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label style={{ color: '#000' }} for="guildDesc">Guild Description</Label>
                <Input type="text" name="guildDesc" value={this.state.guildDesc} onChange={this.handleChange} />
                <FormText color={this.state.guildDesc.length > 140 ? "danger" : "muted"}>
                  Character count: {this.state.guildDesc.length} / 140
                </FormText>
              </FormGroup>
              <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.toggleAddGuild}>Close</Button>
              <Button className="btn-float-r" color="success" onClick={() => {this.addGuildToDB(); this.toggleAddGuild();}}>Add</Button>
            </Form>
            </ModalBody>
          </Modal>
          <DropdownItem> Show Applications</DropdownItem>
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
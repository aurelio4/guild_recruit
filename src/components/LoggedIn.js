import React from 'react'
import Fire from './Fire'
import servers from './servers.json'
import {
  Badge,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
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
    this.setUserProfile = this.setUserProfile.bind(this)
    this.deleteUserProfile = this.deleteUserProfile.bind(this)
    this.deleteUserGuild = this.deleteUserGuild.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getUserEmail = this.getUserEmail.bind(this)
    this.toggleAddGuild = this.toggleAddGuild.bind(this)
    this.toggleManageGuild = this.toggleManageGuild.bind(this)
    this.toggleDeleteProfileModal = this.toggleDeleteProfileModal.bind(this)
    this.toggleDeleteGuildModal = this.toggleDeleteGuildModal.bind(this)
    this.addGuildToDB = this.addGuildToDB.bind(this)
    this.toggleRegionSelect = this.toggleRegionSelect.bind(this)
    this.toggleFactionSelect = this.toggleFactionSelect.bind(this)
    this.setEditDisabled = this.setEditDisabled.bind(this)
    this.setRegionEU = this.setRegionEU.bind(this)
    this.setRegionUS = this.setRegionUS.bind(this)
    this.setFactionA = this.setFactionA.bind(this)
    this.setFactionH = this.setFactionH.bind(this)
    this.checkGuildData = this.checkGuildData.bind(this)
    this.ucFirst = this.ucFirst.bind(this)
    this.getGuildInfo = this.getGuildInfo.bind(this)
    this.toggleServerSelect = this.toggleServerSelect.bind(this)
    this.getServer = this.getServer.bind(this)

    this.state = {
      profileModal: false,
      addGuildModal: false,
      manageGuildModal: false,
      deleteGuildModal: false,
      deleteProfileModal: false,
      editDisabled: true,
      profileUsername: '',
      profileEmail: '',
      profileDiscord: '',
      profileUid: '',
      guildName: '',
      guildNameError: '',
      guildRegion: '',
      guildRegionError: '',
      guildServer: '',
      guildServerError: '',
      guildDesc: '',
      guildDescError: '',
      guildFaction: '',
      guildFactionError: '',
      factionColor: 'secondary',
      regionSelect: false,
      factionSelect: false,
      userHasGuild: false,
      serverSelect: false
    }
  }

  componentDidMount() {
    this.getUserEmail()
  }

  logout() {
    Fire.auth().signOut();
  }

  updateUsername(value) {
    this.setState({ profileUsername: value })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  ucFirst(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  setRegionEU() {
    this.setState({ guildRegion: 'EU'})
  }

  setRegionUS() {
    this.setState({ guildRegion: 'US' })
  }

  setFactionA() {
    this.setState({ guildFaction: 'Alliance' })
    this.setState({ factionColor: 'primary' })
  }

  setFactionH() {
    this.setState({ guildFaction: 'Horde' })
    this.setState({ factionColor: 'danger' })
  }

  setEditDisabled() {
    this.setState(prevState => ({
      editDisabled: !prevState.editDisabled
    }))
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

  toggleManageGuild() {
    this.setState(prevState => ({
      manageGuildModal: !prevState.manageGuildModal
    }))
  }

  toggleDeleteGuildModal() {
    this.setState(prevState => ({
      deleteGuildModal: !prevState.deleteGuildModal
    }))
  }

  toggleDeleteProfileModal() {
    this.setState(prevState => ({
      deleteProfileModal: !prevState.deleteProfileModal
    }))
  }

  toggleRegionSelect() {
     this.setState(prevState => ({
      regionSelect: !prevState.regionSelect
    }))
  }

  toggleFactionSelect() {
    this.setState(prevState => ({
      factionSelect: !prevState.factionSelect
    }))
  }

  toggleServerSelect() {
    this.setState(prevState => ({
      serverSelect: !prevState.serverSelect
    }))
  }

  checkGuildData() {
    this.setState({
      guildDescError: '',
      guildNameError: '',
      guildRegionError: '',
      guildServerError: '',
      guildFactionError: '',
      successfulGuildLog: false
    })

    if (!this.state.guildName) {
      this.setState({ guildNameError: 'Guild Name is empty!'})
    } else if(!this.state.guildRegion) {
      this.setState({ guildRegionError: 'Region isn\'t chosen!'})
    } else if(!this.state.guildFaction) {
      this.setState({ guildFactionError: 'Faction isn\'t chosen!'})
    } else if(!this.state.guildServer) {
      this.setState({ guildServerError: 'Server is blank!' })
    } else if(!this.state.guildDesc) {
      this.setState({ guildDescError: 'Description is blank!' })
    } else if (this.state.guildName.length < 3 || this.state.guildName.length > 24) {
      this.setState({ guildNameError: 'Error in Guild Name length!'})
    } else if(this.state.guildDesc.length > 140) {
      this.setState({ guildDescError: 'Description is too long!'})
    } else if(this.state.guildDesc.length < 10) {
      this.setState({ guildDescError: 'Description is too short!'})
    } else {
      this.addGuildToDB()
    }
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
        Fire.firestore().collection('guilds').doc(this.state.profileUid).get().then(doc => {
          if(doc.exists) {
            this.setState({ userHasGuild: true })
          } else (
            console.log("No guild exists for this user!")
          )
        })
      } else if (!user) {
        console.log("No user!")
      }
    })
  }

  getUserInfo() {
    Fire.firestore().collection('users').doc(this.state.profileUid)
      .get().then(doc => {
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

  getGuildInfo() {
    Fire.firestore().collection('guilds').doc(this.state.profileUid)
      .get().then(doc => {
        if(doc.exists) {
          var data = JSON.stringify(doc.data())
          var guild = JSON.parse(data)
          this.setState({ 
            guildName: guild.guildName,
            guildFaction: guild.guildFaction,
            guildRegion: guild.guildRegion.slice(0, -1),
            guildServer: guild.guildServer,
            guildDesc: guild.guildDesc
           })
        } else { console.log("No such document!") }
      }).catch(err => {
        console.log("Error getting info from DB: ", err)
      })
  }

  getServer(e) {
    var data = JSON.stringify(servers)
    var serverList = JSON.parse(data)
    var serverArray = []

      // eslint-disable-next-line array-callback-return
      serverList.map((lists) => {
        serverArray.push(lists)
      })
    var clickedKey = e.target.id
    var serverName = serverArray[clickedKey - 1]
    this.setState({ guildServer: serverName.server })
    console.log(this.state.guildServer)
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

  deleteUserProfile() {
    var canDelete = false
    Fire.firestore().collection('users').doc(this.state.profileUid).delete()
      .then(() => {
        console.log("Document deleted successfully")
        canDelete = true;
        if(canDelete) {
          Fire.auth().currentUser.delete().then(() => {
            console.log("User deleted successfully")
          }).catch(err => {
            console.log("Error deleting user: ", err)
          })
        }
      }).catch(err => {
        console.log("Error deleting document: ", err)
      })
    }

  deleteUserGuild() {
    Fire.firestore().collection('guilds').doc(this.state.profileUid).delete()
      .then(() => {
        console.log("Document deleted successfully")
      }).catch(err => {
        console.log("Error deleting document: ", err)
      })
  }

  addGuildToDB() {
    Fire.firestore().collection('guilds').doc(this.state.profileUid)
    .set({
      guildMaster: this.state.profileUsername,
      guildName: this.state.guildName,
      guildRegion: this.state.guildRegion + "-",
      guildServer: this.ucFirst(this.state.guildServer),
      guildDesc: this.ucFirst(this.state.guildDesc),
      guildFaction: this.ucFirst(this.state.guildFaction),
      applicants: []
    }).then(() => {
      console.log("Successfully written to Firestore")
      this.toggleAddGuild()
      this.setState({ userHasGuild: true })
    }).catch(err => {
      console.log("Error writing to DB: ", err)
    })
  }

  render() {
    return ([
      <NavItem>
        <NavLink href="#" onClick={() => {this.toggleProfile(); this.getUserInfo()}}> {this.state.profileUsername ? this.state.profileUsername : "Loading.."} </NavLink>
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
              {this.state.editDisabled 
              ? <Button className="btn-float-r btn-spacing" 
                        color="info"
                        onClick={this.setEditDisabled}>
                        Edit
                  </Button>
              : <Button className="btn-float-r btn-spacing" 
                        color="success"
                        onClick={() => {this.setEditDisabled(); this.setUserProfile(); this.toggleProfile()}}>
                        Update
                </Button>}
            </Form>
          </ModalBody>
        </Modal>
      </NavItem>,
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          {this.state.userHasGuild 
          ? <DropdownItem onClick={() => {this.getGuildInfo(); this.toggleManageGuild()}}> Manage Guild </DropdownItem>
          : <DropdownItem onClick={this.toggleAddGuild}>Create Guild</DropdownItem>}
          <Modal isOpen={this.state.manageGuildModal} toggle={this.toggleManageGuild}>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label style={{ color: '#000' }} for="guildName">Guild Name</Label>
                  <Input className="info-font" type="text" name="guildName" defaultValue={this.state.guildName} disabled />
                </FormGroup>
                <FormGroup>
                  <Label style={{ color: '#000' }} for=" guild">Guild Server</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="info-font" >{this.state.guildFaction}</InputGroupText>
                      <InputGroupText className="info-font" >{this.state.guildRegion}</InputGroupText>
                    </InputGroupAddon>
                    <Input className="info-font" type="text" name="guildName" defaultValue={this.state.guildServer} disabled/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label style={{ color: '#000' }} for="guildDesc">Guild Description</Label>
                  <Input className="info-font" type="textarea" name="guildDesc" defaultValue={this.state.guildDesc} disabled />
                </FormGroup>
                <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.toggleManageGuild}>Close</Button>
              </Form>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.addGuildModal} toggle={this.toggleAddGuild}>
            <ModalBody>
            <Form>
              <FormGroup>
                <Badge color="danger" className="badge-spacing visible">{this.state.guildNameError}</Badge>
                <Input type="text" name="guildName" value={this.state.guildName} onChange={this.handleChange} placeholder="Guild Name" />
              </FormGroup>
              <FormGroup>
                <Badge color="danger" className="badge-spacing visible">{this.state.guildFactionError}{this.state.guildRegionError}{this.state.guildServerError}</Badge>
                <InputGroup>
                  <InputGroupButtonDropdown addonType="append" isOpen={this.state.factionSelect} toggle={this.toggleFactionSelect}>
                    <DropdownToggle color={this.state.factionColor}>
                      {this.state.guildFaction ? this.state.guildFaction : "Faction"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.setFactionA}>Alliance</DropdownItem>
                      <DropdownItem onClick={this.setFactionH}>Horde</DropdownItem>
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                  <InputGroupButtonDropdown addonType="append" isOpen={this.state.regionSelect} toggle={this.toggleRegionSelect}>
                    <DropdownToggle>
                      {this.state.guildRegion ? this.state.guildRegion : "Region"}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.setRegionEU}>EU</DropdownItem>
                      <DropdownItem onClick={this.setRegionUS}>US</DropdownItem>
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                  <InputGroupButtonDropdown addonType="append" isOpen={this.state.serverSelect} toggle={this.toggleServerSelect}>
                    <DropdownToggle>
                      {this.state.guildServer ? this.state.guildServer : "Server"}
                    </DropdownToggle>
                    <DropdownMenu>
                      {servers.map((serverDetail) => {
                        return <DropdownItem key={serverDetail.id} id={serverDetail.id} onClick={this.getServer}>{serverDetail.server}</DropdownItem>
                      })}
                    </DropdownMenu>
                  </InputGroupButtonDropdown>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Badge color="danger" className="badge-spacing visible">{this.state.guildDescError}</Badge>
                <Input type="textarea" name="guildDesc" value={this.state.guildDesc} onChange={this.handleChange} placeholder="Description" />
                <FormText color={this.state.guildDesc.length > 140 ? "danger" : "muted"}>
                  Character count: {this.state.guildDesc.length} / 140
                </FormText>
              </FormGroup>
              <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.toggleAddGuild}>Close</Button>
              <Button className="btn-float-r" color="success" onClick={() => {if (this.state.successfulGuildLog) { this.checkGuildData(); window.location.reload() } else { this.checkGuildData(); }}}>Create</Button>
            </Form>
            </ModalBody>
          </Modal>
          {this.state.userHasGuild 
          ? [<DropdownItem> Show Applicants</DropdownItem>, 
              <DropdownItem onClick={this.toggleDeleteGuildModal}>Delete Guild</DropdownItem>,
              <Modal isOpen={this.state.deleteGuildModal} toggle={this.toggleDeleteGuildModal}>
                <ModalBody>
                  <span className="delete-font">
                  Are you sure you want to permanently delete your guild? Doing so will delete the following:
                    <ul className="no-dots">
                      <li> - Guild</li>
                      <li> - Guild Applications</li>
                    </ul>
                  </span>
                </ModalBody>
                <ModalFooter>
                  <Button color="success" onClick={() => {this.deleteUserGuild(); this.toggleDeleteGuildModal()}}>Delete</Button>
                  <Button color="danger" onClick={this.toggleDeleteGuildModal}>Nevermind</Button>
                </ModalFooter>
              </Modal>]
          : <DropdownItem> Show Applications</DropdownItem>}
          <DropdownItem divider />
          <DropdownItem onClick={this.toggleDeleteProfileModal}>
            Delete Account
          </DropdownItem>
          <Modal isOpen={this.state.deleteProfileModal} toggle={this.toggleDeleteProfileModal}>
            <ModalBody>
              <span className="delete-font">
                Are you sure you want to permanently delete your account? Doing so will delete the following:
                <ul className="no-dots">
                  <li> - Guild (If applicable)</li>
                  <li> - Guild applications (If applicable)</li>
                  <li> - Profile</li>
                </ul>
              </span>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => {this.deleteUserProfile(); this.toggleDeleteProfileModal()}}>Delete</Button>
              <Button color="danger" onClick={this.toggleDeleteProfileModal}>Nevermind</Button>
            </ModalFooter>
          </Modal>
          <DropdownItem onClick={this.logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>]
    )
  }
}

export default LoggedIn
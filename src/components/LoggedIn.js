import React from 'react'
import Fire from './Fire'
import ProfileModal from './ProfileModal'
import ManageGuildModal from './ManageGuildModal'
import AddGuildModal from './AddGuildModal'
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
    this.deleteUserProfile = this.deleteUserProfile.bind(this)
    this.deleteUserGuild = this.deleteUserGuild.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.getUserEmail = this.getUserEmail.bind(this)
    this.toggleAddGuild = this.toggleAddGuild.bind(this)
    this.toggleManageGuild = this.toggleManageGuild.bind(this)
    this.toggleDeleteProfileModal = this.toggleDeleteProfileModal.bind(this)
    this.toggleDeleteGuildModal = this.toggleDeleteGuildModal.bind(this)
    this.ucFirst = this.ucFirst.bind(this)
    this.getGuildInfo = this.getGuildInfo.bind(this)
    this.closeProfileModal = this.closeProfileModal.bind(this)
    this.closeManageGuildModal = this.closeManageGuildModal.bind(this)
    this.closeAddGuildModal = this.closeAddGuildModal.bind(this)

    this.state = {
      profileUid: '',
      profileUsername: '',
      profileModal: false,
      addGuildModal: false,
      manageGuildModal: false,
      deleteGuildModal: false,
      deleteProfileModal: false,
      guildName: '',
      guildRegion: '',
      guildServer: '',
      guildDesc: '',
      guildFaction: '',
      userHasGuild: false
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

  closeProfileModal() {
    this.setState({ profileModal: false })
  }

  closeManageGuildModal() {
    this.setState({ manageGuildModal: false })
  }

  closeAddGuildModal() {
    this.setState({ addGuildModal: false })
  }

  getUserEmail() {
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
        window.location.reload()
      }).catch(err => {
        console.log("Error deleting document: ", err)
      })
  }

  render() {
    return ([
      <NavItem>
        <NavLink href="#" onClick={this.toggleProfile}> {this.state.profileUsername ? this.state.profileUsername : "Loading.."} </NavLink>
        <ProfileModal key="profileModal" callback={this.closeProfileModal} isShow={this.state.profileModal} />
      </NavItem>,
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          {this.state.userHasGuild 
          ? <DropdownItem onClick={() => {this.toggleManageGuild(); this.getGuildInfo()}}> Manage Guild </DropdownItem>
          : <DropdownItem onClick={this.toggleAddGuild}>Create Guild</DropdownItem>}
          <ManageGuildModal 
            key="manageGuildModal" 
            callback={this.closeManageGuildModal} 
            isShow={this.state.manageGuildModal}
            guildName={this.state.guildName}
            guildDesc={this.state.guildDesc}
            guildServer={this.state.guildServer}
            guildFaction={this.state.guildFaction}
            guildRegion={this.state.guildRegion} />

          <AddGuildModal 
            key="addGuildModal"
            callback={this.closeAddGuildModal}
            isModalShow={this.state.addGuildModal}
            isRegionOpen={this.state.regionSelect}
            isFactionOpen={this.state.factionSelect} />

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
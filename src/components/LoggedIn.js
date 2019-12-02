import React from 'react'
import Fire from './Fire'
import ProfileModal from './ProfileModal'
import AddGuildModal from './AddGuildModal'
import ManageGuildModal from './ManageGuildModal'
import DeleteGuildModal from './DeleteGuildModal'
import DeleteProfileModal from './DeleteProfileModal'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
    this.closeDeleteGuildModal = this.closeDeleteGuildModal.bind(this)
    this.closeDeleteProfileModal = this.closeDeleteProfileModal.bind(this)

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

  closeDeleteGuildModal() {
    this.setState({ deleteGuildModal: false })
  }

  closeDeleteProfileModal() {
    this.setState({ deleteProfileModal: false })
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
              <DeleteGuildModal 
                key="deleteGuildModal"
                callback={this.closeDeleteGuildModal}
                isModalShow={this.state.deleteGuildModal} />]
          : <div></div>}
          <DropdownItem divider />
          <DropdownItem onClick={this.toggleDeleteProfileModal}>
            Delete Account
          </DropdownItem>
          <DeleteProfileModal 
            key="deleteProfileModal"
            callback={this.closeDeleteProfileModal}
            isModalShow={this.state.deleteProfileModal} />

          <DropdownItem onClick={this.logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>]
    )
  }
}

export default LoggedIn
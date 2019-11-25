import React from 'react'
import servers from './servers.json'
import Fire from './Fire'
import {
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Badge,
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormText,
  Button } from 'reactstrap'

class AddGuildModal extends React.Component {
  constructor(props){
    super(props)

    this.closeModal = this.closeModal.bind(this)
    this.ucFirst = this.ucFirst.bind(this)
    this.toggleFactionSelect = this.toggleFactionSelect.bind(this)
    this.toggleRegionSelect = this.toggleRegionSelect.bind(this)
    this.toggleServerSelect = this.toggleServerSelect.bind(this)
    this.setRegionEU = this.setRegionEU.bind(this)
    this.setRegionUS = this.setRegionUS.bind(this)
    this.setFactionA = this.setFactionA.bind(this)
    this.setFactionH = this.setFactionH.bind(this)
    this.getServers = this.getServers.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkGuildData = this.checkGuildData.bind(this)
    this.addGuildToDB = this.addGuildToDB.bind(this)
    this.getUser = this.getUser.bind(this)

    this.state = {
      profileUid: '',
      profileUsername: '',
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
      serverSelect: false
    }
  }

  componentWillMount() {
    this.getUser()
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  ucFirst(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  toggleFactionSelect() {
    this.setState(prevState => ({
      factionSelect: !prevState.factionSelect
    }))
  }

  toggleRegionSelect() {
    this.setState(prevState => ({
     regionSelect: !prevState.regionSelect
   }))
  }

  toggleServerSelect() {
   this.setState(prevState => ({
     serverSelect: !prevState.serverSelect
   }))
  }
  
  closeModal() {
    this.props.callback(false)
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

  getUser() {
    Fire.auth().onAuthStateChanged(user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ profileUid: userUid })
      }
      Fire.firestore().collection('users').doc(this.state.profileUid).get().then(doc => {
        if(doc.exists) {
          var data = JSON.stringify(doc.data())
          var user = JSON.parse(data)
          this.setState({ profileUsername: user.username })
        }
      })
    })
  }

  getServers(e) {
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
  }

  checkGuildData() {
    this.setState({
      guildDescError: '',
      guildNameError: '',
      guildRegionError: '',
      guildServerError: '',
      guildFactionError: ''
    })

    if (!this.state.guildName) {
      this.setState({ guildNameError: 'Guild Name is empty!'})
    } else if(!this.state.guildFaction) {
      this.setState({ guildFactionError: 'Faction isn\'t selected!'})
    } else if(!this.state.guildRegion) {
      this.setState({ guildRegionError: 'Region isn\'t selected!'})
    } else if(!this.state.guildServer) {
      this.setState({ guildServerError: 'Server isn\'t selected!' })
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
      window.location.reload()
    }).catch(err => {
      console.log("Error writing to DB: ", err)
    })
  }

  render() {
    return(
      <Modal isOpen={this.props.isModalShow} toggle={this.closeModal}>
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
                    return <DropdownItem key={serverDetail.id} id={serverDetail.id} onClick={this.getServers}>{serverDetail.server}</DropdownItem>
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
          <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.closeModal}>Close</Button>
          <Button className="btn-float-r" color="success" onClick={this.checkGuildData}>Create</Button>
        </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default AddGuildModal
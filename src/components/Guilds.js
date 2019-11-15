import React from 'react'
import Fire from './Fire'
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input } from 'reactstrap'

// Yoo bro mad misleading that this class is a card for a singular Guild 
// but you named it plural Guilds :thinking: make the code easy for strangers to read

class Guilds extends React.Component {
  constructor(props) {
    super(props)

    this.getUserInfo = this.getUserInfo.bind(this)
    this.applyUserToGuild = this.applyUserToGuild.bind(this)
    this.togglePublicProfile = this.togglePublicProfile.bind(this)

    this.state = {
      userLoggedIn: false,
      publicProfileModal: false,
      playerUid: '',
      didPlayerApply: 'Apply',
      buttonDisabled: false
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo() {
    // set user login
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        this.setState({ userLoggedIn: true })
        this.setState({ playerUid: Fire.auth().currentUser.uid })
      } else {
        this.setState({ userLoggedIn: false })
      }
    })
    
    // check for guilds applied to
    var path = Fire.firestore().collection('guilds')
    var query = path.where("applicants", "array-contains", this.state.playerUid)
    
    query.get().then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      })
    }).catch(err => {
      console.log("Error fetching: ", err)
    })

  }

  applyUserToGuild() {
    var adminUid = this.props.id
    var applicantUid = this.state.playerUid
    var path = Fire.firestore().collection('guilds').doc(adminUid)
    
    path.get().then(doc => {
        if(doc.exists) {
          path.update({ applicants: Fire.firestore.FieldValue.arrayUnion(applicantUid) })
            .then(() => {
              // at this point they've applied
              this.setState({ 
                didPlayerApply: 'Applied',
                buttonDisabled: true,
               })
            });
        } else { console.log("No such document!") }
    })
  }

  togglePublicProfile() {
    this.setState(prevState => ({
      publicProfileModal: !prevState.publicProfileModal
    }))
  }

  render() {
    return (
        <Col sm="4">
          <Card body inverse className="the-boxes" style={{ backgroundColor: '#333', borderColor: '#FFF' }}>
            <CardBody className="guild-box">
              <CardTitle className={this.props.guildFaction}>{this.props.guildName}</CardTitle>
              <CardSubtitle className="ras text-muted">{this.props.guildRegion}</CardSubtitle>
              <CardSubtitle className="ras text-muted">{this.props.guildServer}</CardSubtitle>
              <CardSubtitle className="gm-spacing">
                <span className="text-muted">GM: </span>
                <a id={this.props.id} href="#" onClick={() => {this.togglePublicProfile(); return false;}} className={this.props.gmStyle}>{this.props.guildMaster}</a>
              </CardSubtitle>
              <Modal isOpen={this.state.publicProfileModal} toggle={this.togglePublicProfile}>
                <ModalBody>
                  <Form>
                    <FormGroup>
                        <Label style={{ color: '#000' }} for="username">Username</Label>
                        <Input type="username" name="playerUsername" value={this.state.playerUsername} disabled/>
                    </FormGroup>
                    <FormGroup>
                      <Label style={{ color: '#000' }} for="email">Guild</Label>
                      <Input type="text" name="guild" value={this.state.playerGuild} disabled />
                    </FormGroup>
                    <FormGroup>
                      <Label style={{ color: '#000' }} for="discord">Discord</Label>
                      <Input type="text" name="playerDiscord" value={this.state.playerDiscord} disabled/>
                    </FormGroup>
                    <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.togglePublicProfile}>Close</Button>
                  </Form>
                </ModalBody>
              </Modal>
              <hr className="hr-divider" />
              <CardText>{this.props.guildDesc}</CardText>
              <Button id={this.props.id} onClick={this.applyUserToGuild} disabled={this.state.buttonDisabled}>{this.state.didPlayerApply}</Button>
            </CardBody>
          </Card>
        </Col>
    )
  }
}

export default Guilds

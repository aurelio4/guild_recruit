import React from 'react'
import Fire from './Fire'
import PublicProfileModal from './PublicProfileModal'
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col } from 'reactstrap'

class GuildCard extends React.Component {
  constructor(props) {
    super(props)

    this.getUserInfo = this.getUserInfo.bind(this)
    this.applyUserToGuild = this.applyUserToGuild.bind(this)
    this.togglePublicProfile = this.togglePublicProfile.bind(this)
    this.closePublicProfileModal = this.closePublicProfileModal.bind(this)

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
    // get user login status

    // set user login, ON LOGIN
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        this.setState({ 
          userLoggedIn: true,
          playerUid: Fire.auth().currentUser.uid
         })
      } else {
        this.setState({ userLoggedIn: false })
      }
    })

    console.log(this.state.userLoggedIn)
    
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

  closePublicProfileModal(data) {
    this.setState({ publicProfileModal: data })
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
              <PublicProfileModal key="ppModal" callback={this.closePublicProfileModal} isShow={this.state.publicProfileModal} />
              <hr className="hr-divider" />
              <CardText>{this.props.guildDesc}</CardText>
              <Button id={this.props.id} onClick={this.applyUserToGuild} disabled={this.state.buttonDisabled}>{this.state.didPlayerApply}</Button>
            </CardBody>
          </Card>
        </Col>
    )
  }
}

export default GuildCard

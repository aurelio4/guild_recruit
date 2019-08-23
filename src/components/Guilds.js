import React from 'react'
import Fire from './Fire'
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col } from 'reactstrap'

class Guilds extends React.Component {
  constructor(props) {
    super(props)

    this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this)
    this.applyUserToGuild = this.applyUserToGuild.bind(this)

    this.state = {
      userLoggedIn: false,
      playerUid: '',
      playerApplied: false
    }
  }

  componentDidMount() {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        this.setState({ userLoggedIn: true })
        this.setState({ playerUid: Fire.auth().currentUser.uid})
      } else {
        this.setState({ userLoggedIn: false })
      }
    })
  }

  applyUserToGuild() {
    var adminUid = this.props.id
    var applicantUid = this.state.playerUid
    var path = Fire.firestore().collection('guilds').doc(adminUid)
    path.get().then(doc => {
        if(doc.exists) {
          path.update({ applicants: Fire.firestore.FieldValue.arrayUnion(applicantUid) })
        }
      })
  }

  render() {
    return (
      <Col sm="4">
        <Card body inverse className="the-boxes" style={{ backgroundColor: '#333', borderColor: '#FFF' }}>
          <CardBody className="guild-box">
            <CardTitle className={this.props.guildFaction}>{this.props.guildName}</CardTitle>
            <CardSubtitle className="ras text-muted">{this.props.guildRegion}</CardSubtitle>
            <CardSubtitle className="ras text-muted">{this.props.guildServer}</CardSubtitle>
            <hr className="hr-divider" />
            <CardText>{this.props.guildDesc}</CardText>
            {this.state.userLoggedIn
            ? this.state.playerApplied 
              ? <Button disabled>Applied</Button>
              : <Button onClick={this.applyUserToGuild}>Apply</Button>
            : " " }
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default Guilds

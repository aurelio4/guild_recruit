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
    this.getGuildOwnerUID = this.getGuildOwnerUID.bind(this)

    this.state = {
      userLoggedIn: false,
      GuildApplyOwnerUID: 0
    }
  }

  componentDidMount() {
    this.checkUserLoggedIn()
  }

  checkUserLoggedIn() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        this.setState({ userLoggedIn: true })
      } else {
        this.setState({ userLoggedIn: false })
      }
    })
  }

  getGuildOwnerUID(e) {
    const selectedIndex = e.target.options.selectedIndex;
    this.setState({ GuildApplyOwnerUID: e.target.options[selectedIndex].getAttribute('key')})
    console.log(this.state.GuildApplyOwnerUID)
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
            ? <Button onClick={this.getGuildOwnerUID}>Apply</Button>
            : " " }
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default Guilds

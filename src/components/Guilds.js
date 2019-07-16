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

    this.state = {
      userLoggedIn: false
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
            ? [<Button>Apply</Button>,<Button className="btn-spacing">Contact</Button>]
            : " " }
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default Guilds

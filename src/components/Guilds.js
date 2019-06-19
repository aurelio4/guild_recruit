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

  componentWillMount() {
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
            <CardTitle className={this.props.faction}>{this.props.guildname}</CardTitle>
            <CardSubtitle className="text-muted">{this.props.server}</CardSubtitle>
            <hr className="hr-divider" />
            <CardText>{this.props.desc}</CardText>
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

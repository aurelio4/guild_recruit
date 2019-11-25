import React from 'react'
import {
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button } from 'reactstrap'

class PublicProfileModal extends React.Component {
  constructor(props) {
    super(props)

    this.sendData = this.sendData.bind(this)

    this.state = {

    }
  }

  sendData() {
    this.props.callback(false)
  }

  render() {
    return (
      // values have to be filled with guild master
      <Modal isOpen={this.props.isShow} toggle={this.togglePublicProfile}>
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
            <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.sendData}>Close</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default PublicProfileModal
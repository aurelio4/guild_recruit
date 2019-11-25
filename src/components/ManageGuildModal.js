import React from 'react'
import {
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button } from 'reactstrap'

class ManageGuildModal extends React.Component {
  constructor(props) {
    super(props)

    this.sendData = this.sendData.bind(this)
  }

  sendData() {
    this.props.callback(false)
  }

  render() {
    return(
      <Modal isOpen={this.props.isShow} toggle={this.sendData}>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{ color: '#000' }} for="guildName">Guild Name</Label>
              <Input className="info-font" type="text" name="guildName" defaultValue={this.props.guildName} disabled />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: '#000' }} for=" guild">Guild Server</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText className="info-font" >{this.props.guildFaction}</InputGroupText>
                  <InputGroupText className="info-font" >{this.props.guildRegion}</InputGroupText>
                </InputGroupAddon>
                <Input className="info-font" type="text" name="guildName" defaultValue={this.props.guildServer} disabled/>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label style={{ color: '#000' }} for="guildDesc">Guild Description</Label>
              <Input className="info-font" type="textarea" name="guildDesc" defaultValue={this.props.guildDesc} disabled />
            </FormGroup>
            <Button className="btn-float-r btn-spacing" color="secondary" onClick={this.sendData}>Close</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default ManageGuildModal
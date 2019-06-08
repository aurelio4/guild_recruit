import React from 'react'
import Fire from './Fire'
import {
  Button,
  NavLink,
  NavItem,
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.toggleProfile = this.toggleProfile.bind(this)

    this.state = {
      profileModal: false
    }
  }

  logout() {
    Fire.auth().signOut();
  }

  toggleProfile() {
    this.setState(prevState => ({
      profileModal: !prevState.profileModal
    }))
  }

  render() {
    return ([
      <NavItem>
        <NavLink href="#" onClick={this.toggleProfile}> My Profile </NavLink>
        <Modal isOpen={this.state.profileModal} toggle={this.toggleProfile}>
          <ModalBody>
            <Button className="register-button btn-spacing" color="secondary" onClick={this.toggleProfile}>Close</Button>
            <Button className="register-button" color="success" disabled="true">Update</Button>
          </ModalBody>
        </Modal>
      </NavItem>,
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem> Edit Account </DropdownItem>
          <DropdownItem> Discord Option? </DropdownItem>
          <DropdownItem divider />
          <DropdownItem> Add(/edit?) Guild</DropdownItem>
          <DropdownItem> Show Guilds Applied To?</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>]
    )
  }
}

export default LoggedIn
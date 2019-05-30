import React from 'react'
import Fire from './Fire'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {
    }
  }

  logout() {
    Fire.auth().signOut();
  }

  render() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Options
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem> Option 1 </DropdownItem>
          <DropdownItem> Option 2 </DropdownItem>
          <DropdownItem> Option 3 </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
}

export default LoggedIn
import React from 'react'
import './Navbar.css'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul className="ul-nodot">
          <li><input type="text" name="username" /></li>
          <li><input type="password" name="password" /></li>
          <li><button>Login</button></li>
        </ul>
      </div>
    )
  }
}

export default Navbar

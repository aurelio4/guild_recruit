import React from 'react'
import "./Guilds.css"

class Guilds extends React.Component {
  render() {
    return (
      <div className="guild-box">
        <h1 className={this.props.faction}>24 max length guild name</h1>
        <span className="server-name"> US-Sargeras </span>
      </div>
    )
  }
}

export default Guilds

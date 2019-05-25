import React from 'react'
import "./Guilds.css"

class Guilds extends React.Component {
  render() {
    return (
      <div className="guild-box">
        <h1 className={this.props.faction}>24 max length guild name</h1>
        <span className="server-name"> US-Sargeras </span>
        <hr className="hr-divider" />
        <p className="guild-desc"> This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us. </p>
      </div>
    )
  }
}

export default Guilds

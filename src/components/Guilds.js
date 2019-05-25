import React from 'react'
import "./Guilds.css"

class Guilds extends React.Component {
  render() {
    return (
      <div className="guild-box">
        <a className={this.props.faction} href="#">{this.props.guildname}</a>
        <span className="server-name"> {this.props.server} </span>
        <hr className="hr-divider" />
        <p className="guild-desc">{this.props.desc}</p>
      </div>
    )
  }
}

export default Guilds

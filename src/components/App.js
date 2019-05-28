import React from 'react'
import Guilds from './Guilds'
import Directory from './Directory'
import { Row } from 'reactstrap'
import './App.css'

class App extends React.Component {
  render() {

    const alliance = 'guild-name -alliance'
    const horde = 'guild-name -horde'

    return(
      <div className="main-div">
        <Row>
          <Guilds guildname="HelloQ" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="World" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="Method" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        </Row>
        <Directory />
        <Row>
          <Guilds guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="WorldD" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="Method B" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        </Row>
        <Row>
          <Guilds guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="WorldD" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="Method B" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        </Row>
        <Row>
          <Guilds guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="WorldD" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="Method B" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        </Row>
        <Row>
          <Guilds guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="WorldD" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="Method B" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        </Row>
        <Row>
          <Guilds guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="WorldD" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
          <Guilds guildname="Method B" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        </Row>
    </div>
    )
  }
}

export default App

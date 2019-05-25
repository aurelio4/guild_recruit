import React from 'react'
import Guilds from './Guilds'
import Navbar from './Navbar'

class App extends React.Component {

  render() {
    const alliance = 'guild-name -alliance'
    const horde = 'guild-name -horde'
    return(
      <div>
        <Navbar />
        <Guilds guildname="HelloQ" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        <Guilds guildname="World" faction={alliance} server="US-Sargeras" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
        <Guilds guildname="Method" faction={horde} server="EU-Tauren Mill" desc="This is some sample text about our guild that we are advertising for our raiding team. Please contact us to join us" />
      </div>
    )
  }
}

export default App

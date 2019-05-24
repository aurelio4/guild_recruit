import React from 'react'
import Guilds from './Guilds'
import Navbar from './Navbar'

class App extends React.Component {

  render() {
    const alliance = 'guild-name -alliance'
    const horde = 'guild-name -horde'
    return(
      <div>
        <Guilds faction={alliance} />
        <Guilds faction={horde} />
        <Guilds faction={alliance} />
      </div>
    )
  }
}

export default App

import React from 'react'
import Guilds from './Guilds'
import Directory from './Directory'
import Fire from './Fire'
import { Row } from 'reactstrap'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.getUserUID = this.getUserUID.bind(this)
    this.guildInfo = this.guildInfo.bind(this)

    this.state = {
      profileUid: ''
    }
  }

  componentWillMount() {
    this.getUserUID()
    this.guildInfo()
  }

  getUserUID() {
    Fire.auth().onAuthStateChanged( user => {
      if(user) {
        const userUid = Fire.auth().currentUser.uid
        this.setState({ profileUid: userUid})  
      }
    })
  }

  guildInfo() {
    Fire.firestore().collection('guilds')
      .get().then(querySnapshot => {
        const data = querySnapshot.docs
          .map(doc => doc.data())
          console.log(data)
          for(var i = 0; i < data.length; i++) {
            console.log(data[i].guildName)
          } 
      })
    }

  render() {
    const alliance = 'guild-name -alliance'
    const horde = 'guild-name -horde'
    return(
      <div className="main-div">
        <Row>
          <Guilds key={4} guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={5} guildname="WorldQ" faction={horde} server="US-Aerie Peak" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={6} guildname="Test" faction={alliance} server="EU-Ravenholdt" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
        </Row>
        <Directory />
        <Row>
          <Guilds key={1} guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={2} guildname="WorldQ" faction={horde} server="US-Aerie Peak" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={3} guildname="Test" faction={alliance} server="EU-Ravenholdt" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
        </Row>
        <Row>
          <Guilds key={7} guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={8} guildname="WorldQ" faction={horde} server="US-Aerie Peak" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={9} guildname="Test" faction={alliance} server="EU-Ravenholdt" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
        </Row>
        <Row>
          <Guilds key={10} guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={11} guildname="WorldQ" faction={horde} server="US-Aerie Peak" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={12} guildname="Test" faction={alliance} server="EU-Ravenholdt" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
        </Row>
        <Row>
          <Guilds key={13} guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={14} guildname="WorldQ" faction={horde} server="US-Aerie Peak" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={15} guildname="Test" faction={alliance} server="EU-Ravenholdt" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
        </Row>
        <Row>
          <Guilds key={16} guildname="HelloP" faction={alliance} server="US-Sargeras" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={17} guildname="WorldQ" faction={horde} server="US-Aerie Peak" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
          <Guilds key={18} guildname="Test" faction={alliance} server="EU-Ravenholdt" desc="This is a test description to tell you a little about our hardcore progressive raiding guild!" />
        </Row>
    </div>
    )
  }
}

export default App

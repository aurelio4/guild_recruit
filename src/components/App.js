import React from 'react'
import Guilds from './Guilds'
import Directory from './Directory'
import Fire from './Fire'
import { CardDeck } from 'reactstrap'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.getUserUID = this.getUserUID.bind(this)
    this.guildInfo = this.guildInfo.bind(this)
    this.renderCards = this.renderCards.bind(this)

    this.state = {
      profileUid: '',
      guilds: []
    }
  }

  componentDidMount() {
    this.guildInfo()
    this.getUserUID()
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
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          this.setState({
            guilds: [{
              id: doc.id,
              guildDesc: doc.data().guildDesc,
              guildFaction: doc.data().guildFaction,
              guildName: doc.data().guildName,
              guildRegion: doc.data().guildRegion,
              guildServer: doc.data().guildServer
            }]
          })
        })
      })
  }

  renderCards() {
    let guilds = this.state.guilds
    guilds.map(guild => {
      console.log(guild)
      return <Guilds
              key={guild.id}
              guildFaction={guild.guildFaction} 
              guildServer={guild.guildServer}
              guildName={guild.guildName} 
              guildDesc={guild.guildDesc} />
    })
  }

  render() {
    const alliance = 'guild-name -alliance'
    const horde = 'guild-name -horde'       
    return(
      <div className="main-div">
        <CardDeck>
          <Guilds guildFaction={alliance} guildServer="Sargeras" guildRegion="US-" guildName="HelloQ" guildDesc="This is a test description." />
          <Guilds guildFaction={horde} guildServer="Sargeras" guildRegion="US-" guildName="HelloQ" guildDesc="This is a test description." />
          <Guilds guildFaction={alliance} guildServer="Sargeras" guildRegion="US-" guildName="HelloQ" guildDesc="This is a test description." />
        </CardDeck>
          <Directory />
        <CardDeck>
          {this.renderCards()}
        </CardDeck>
    </div>
    )
  }
}

export default App

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
        let guilds = []
          snapshot.forEach(doc => {
            guilds.push({
              id: doc.id,
              guildDesc: doc.data().guildDesc,
              guildFaction: doc.data().guildFaction,
              guildName: doc.data().guildName,
              guildRegion: doc.data().guildRegion,
              guildServer: doc.data().guildServer
            })
          })
          this.setState({guilds})
        })
  }

  renderCards() {
    var guildFaction
    var gmGuildFaction
    var guildComp = this.state.guilds.map(guild => {
      if(guild.guildFaction === 'Alliance') {
        guildFaction = 'guild-name -alliance'
        gmGuildFaction = 'gm-link-text -alliance'
      } else if (guild.guildFaction === 'Horde') {
        guildFaction = 'guild-name -horde'
        gmGuildFaction = 'gm-link-text -horde'
      }
      return <Guilds key={guild.id} id={guild.id} guildFaction={guildFaction} guildServer={guild.guildServer} guildName={guild.guildName} gmStyle={gmGuildFaction} guildRegion={guild.guildRegion} guildDesc={guild.guildDesc} />
            })
            return <CardDeck>{guildComp}</CardDeck>
  }

  render() {  
    return(
      <div className="main-div">
      <Directory />
        {this.renderCards()}
      </div>
    )
  }
}

export default App

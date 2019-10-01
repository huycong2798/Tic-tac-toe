import React from 'react'
import './App.css'
import Game from './component/Game.js'

class App extends React.Component {
  render() {

    return (
      <div>
        <h2>Game Caro</h2>
        <Game></Game>
      </div>
      

    );
  }
}

export default App;

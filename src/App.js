import React from "react";
import "./App.css";
import "./index.css";
import Game from "./containers/Game";

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <h2>Game Caro</h2>
        <Game />
      </div>
    );
  }
}

export default App;

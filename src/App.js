/* eslint-disable no-restricted-globals */
import React from "react";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Game from "./containers/Caro/Game";
import RegisterComponent from "./containers/Register/register";
import NormalLoginForm from "./component/Login";
import NavBarComponent from "./component/navBar/navBar";
import AlertComponent from "./containers/Alert/alert";
import "./containers/navBar/navBar.css";

class App extends React.PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <NavBarComponent />
          <AlertComponent />
          <Switch>
            <Route exact path="/" component={Game}>
              <Game />
            </Route>
            <Route path="/register" component={RegisterComponent} />
            <Route path="/login" component={NormalLoginForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

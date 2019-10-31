import React from "react";

import {Router, Switch, Route} from "react-router-dom";
import Game from "./containers/Caro/Game";
import RegisterComponent from "./containers/Register/register";
import LoginComponent from "./containers/Login/Login";
import NavBarComponent from "./containers/navBar/navBar";
import AlertComponent from "./containers/Alert/alert";
import ProfileComponent from "./containers/profile/profile";
import "./containers/navBar/navBar.css";
import history from "./helper/history";

class App extends React.PureComponent {
  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/">
              <NavBarComponent />
              <Game />
            </Route>
            <Route path="/register">
              <AlertComponent />
              <RegisterComponent />
            </Route>
            <Route path="/login">
              <AlertComponent />
              <LoginComponent />
            </Route>
            <Route path="/profile">
              <NavBarComponent />
              <AlertComponent />
              <ProfileComponent />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

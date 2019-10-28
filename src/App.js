import React from "react";

import {Router, Switch, Route} from "react-router-dom";
import Game from "./containers/Caro/Game";
import RegisterComponent from "./containers/Register/register";
import LoginComponent from "./containers/Login/Login";
import NavBarComponent from "./containers/navBar/navBar";
import AlertComponent from "./containers/Alert/alert";
import "./containers/navBar/navBar.css";
import history from "./helper/history";

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
            <Route path="/login" component={LoginComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import allReducers from "./reducers";
import Game from "./containers/Caro/Game";
import Register from "./component/Register";
import Login from "./component/Login";
import Nav from "./component/Home/Nav";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/" exact>
               
              <Provider store={store}>
                <Game />
              </Provider> 
            </Route>
            <Route path="/register">
               
              <Register /> 
            </Route>
            <Route path="/login">
               
              <Login /> 
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

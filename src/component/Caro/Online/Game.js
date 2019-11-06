import React from "react";
// import {Link} from "react-router-dom";
import Chat from "../../Chat/chat";
import Game from "../../../containers/Caro/Game";
// import history from "../../../helper/history";
class GameOnline extends React.PureComponent {
  render() {
    const prop = this.props;
    const {info, isLogged} = prop.userReducer;
    const profileUser = isLogged ? info.user : null;
    return (
      <div>
        {/* {
          !profileUser &&  history.push("/login")
        } */}
        {profileUser && (
          <div className="game">
            <Game />
            <div className="chat">
              <Chat user={profileUser} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default GameOnline;

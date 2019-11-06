import React from "react";
import io from "socket.io-client";
import Chat from "../../Chat/chat";
import GameOnlineService from "../../../services/gameOnlineService";
import Game from "../../../containers/Caro/Game";
import history from "../../../helper/history";

const socket = io("https://server-api-caro.herokuapp.com/");
class GameOnline extends React.PureComponent {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }

  componentWillUnmount() {
    const room = localStorage.getItem("roomId");
    socket.emit("QUIT_ROOM", room);
    localStorage.removeItem("roomId");
  }

  render() {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("socket dasd", socket.id);
      GameOnlineService.findRoom(socket.id);
      socket.on("FIND_ROOM", dataRoom => {
        console.log("data from find room", dataRoom);
        localStorage.setItem("roomId", dataRoom.roomId);
        localStorage.setItem("playFirst", dataRoom.playFirst);
        const roomId = localStorage.getItem("roomId");
        socket.emit("JOIN_ROOM", roomId);
      });
    }

    const prop = this.props;
    const {info, isLogged} = prop.userReducer;

    const profileUser = isLogged ? info.user : null;
    return (
      <div>
        {isLogged && (
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

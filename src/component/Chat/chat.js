/* eslint-disable  */
import React from "react";
import $ from "jquery";
import io from "socket.io-client";
import MessageList from "./message-list";
import Input from "./input";
// import _map from 'lodash/map';

import "../../containers/chat/chat.css";

const socket = io("http://localhost:8000/");
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    console.log("socket", socket.id);
    //socket.on('id', res => this.setState(console.log("id",res),{user: res}))
    socket.on("RECEIVE_MESSAGE", response => {
      console.log("response", response), this.receiveMessage(response);
    });
  }

  receiveMessage(m) {
    const {messages} = this.state;

    messages.push(m);

    const objMessage = $(".messages");
    if (
      objMessage[0].scrollHeight - objMessage[0].scrollTop ===
      objMessage[0].clientHeight
    ) {
      this.setState({messages});
      objMessage.animate({scrollTop: objMessage.prop("scrollHeight")}, 300);
    } else {
      this.setState({messages});
      if (m.id === this.state.user) {
        objMessage.animate({scrollTop: objMessage.prop("scrollHeight")}, 300);
      }
    }
  }

  sendnewMessage(m) {
    console.log("send ", m);
    const roomId = localStorage.getItem("roomId");
    socket.emit("JOIN_ROOM", roomId);
    if (m.value) {
      socket.emit("SEND_MESSAGE", {
        roomId,
        name: this.props.user.name,
        urlAvatar: this.props.user.urlAvatar,
        message: m.value,
      });
      m.value = "";
    }
  }

  componentDidUpdate() {
    if (this.state.typing) {
      if (true) {
      }
    }
  }
  //   componentDidMount () {
  //     const room = localStorage.getItem('roomId');
  //     socket.emit('JOIN_ROOM', room);
  //   }
  typing(data) {
    if (data) {
      const objMessage = $(".messages");
      if (
        objMessage[0].scrollHeight - objMessage[0].scrollTop ===
        objMessage[0].clientHeight
      ) {
        this.setState({typing: data});
        objMessage.animate({scrollTop: objMessage.prop("scrollHeight")}, 300);
      } else {
        this.setState({typing: data});
      }
    } else {
      this.setState({typing: false});
    }
  }

  render() {
    return (
      <div className="app__content">
        <div className="chat_window">
          <MessageList
            user={this.props.user}
            messages={this.state.messages}
            typing={this.state.typing}
          />
          <Input sendMessage={this.sendnewMessage.bind(this)} />
        </div>
      </div>
    );
  }
}

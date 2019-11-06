/* eslint-disable  */
import React from "react";
import Message from "./message-item";

export default class MessageItem extends React.Component {
  render() {
    return (
      <ul className="messages">
        {this.props.messages.map(item => (
          <Message
            key={item.name}
            whoSent={item.name === this.props.user.name}
            urlAvatar={item.urlAvatar}
            message={item.message}
          />
        ))}
      </ul>
    );
  }
}

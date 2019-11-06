/* eslint-disable */
import React from "react";

export default class messageItem extends React.Component {
  render() {
    return (
      <li
        className={
          this.props.whoSent ? "message right appeared" : "message left appeared"
        }
      >
        <div>
          <img src={this.props.urlAvatar} className="avatar"></img>
        </div>
        <div className="text_wrapper">
          <div className="text">{this.props.message}</div>
        </div>
      </li>
    );
  }
}

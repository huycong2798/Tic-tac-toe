import React from "react";
import "antd/dist/antd.css";
import {Alert} from "antd";

class AlertComponent extends React.PureComponent {
  render() {
    const prop = this.props;
    const alert = prop.AlertComponent;
    console.log("alert---", prop.AlertComponent);
    // const alert = {message:"sdấd",type:"success"};
    return (
      <div className="alert-field">
        <Alert message={alert.message} type={alert.type} showIcon />
      </div>
    );
  }
}
export default AlertComponent;

import React from "react";
import "antd/dist/antd.css";
import {Alert} from "antd";
import history from "../../helper/history";

class AlertComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    history.listen(() => {
      // clear alert on location change
      const {clearAlerts} = this.props;
      clearAlerts();
    });
  }

  render() {
    const prop = this.props;
    const alert = prop.AlertComponent;
    return (
      <div className="alert-field">
        <Alert message={alert.message} type={alert.type} showIcon />
      </div>
    );
  }
}
export default AlertComponent;

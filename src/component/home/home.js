import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import {Card, Button} from "antd";

class HomeComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <Card>
          <Link to="/offline">
            <Button>PVE</Button>
          </Link>
          <Link to="/online">
            <Button>PVP</Button>
          </Link>
        </Card>
      </div>
    );
  }
}

export default HomeComponent;

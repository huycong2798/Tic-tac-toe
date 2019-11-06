import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import {Card, Button} from "antd";
import "../../containers/home/home.css";

class HomeComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <img
          src="https://taigamehayfree.info/wp-content/uploads/2018/01/co-caro-icon.png"
          alt="caro"
          style={{width: "30%", height: "30%"}}
        />
        <Card>
          <Link to="/offline">
            <Button className="home-button">PVE</Button>
          </Link>
          <Link to="/online">
            <Button className="home-button">PVP</Button>
          </Link>
        </Card>
      </div>
    );
  }
}

export default HomeComponent;

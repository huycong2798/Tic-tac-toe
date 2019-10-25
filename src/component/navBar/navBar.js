import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import {Menu, Dropdown, Icon} from "antd";

const menu = profileUser => (
  <Menu>
    <Menu.Item>
      <h4>Hi,{profileUser.email}</h4>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link to="/">Profie</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/login">Logout</Link>
    </Menu.Item>
  </Menu>
);
class navBarComponent extends React.PureComponent {
  componentDidMount() {
    const prop = this.props;
    prop.getMe();
  }

  render() {
    const prop = this.props;
    console.log("props", prop);
    const {user, isLogged} = prop.navBarComponent;
    const profileUser = isLogged ? user.user : null;
    return (
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login" hidden={isLogged}>
                Login
              </Link>
            </li>
            {isLogged && (
              <li>
                <Dropdown overlay={menu(profileUser)}>
                  <a className="ant-dropdown-link" href="/">
                    Login <Icon type="down" />
                  </a>
                </Dropdown>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}
export default navBarComponent;

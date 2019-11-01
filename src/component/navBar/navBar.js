import React from "react";
import {Link} from "react-router-dom";
import "antd/dist/antd.css";
import {Menu, Dropdown, Icon, Avatar} from "antd";

const menu = profileUser => (
  <Menu>
    <Menu.Item>
      <h3>Hi, {profileUser.name}</h3>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link to="/profile">Profile</Link>
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
    const {info, isLogged} = prop.navBarComponent;
    const profileUser = isLogged ? info.user : null;
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
                  <a className="ant-dropdown-link" href="##">
                    <Avatar src={profileUser.urlAvatar} alt="avatar" />
                    <Icon type="down" />
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

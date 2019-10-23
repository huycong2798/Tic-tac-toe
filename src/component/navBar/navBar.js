import React from "react";
import {Link} from "react-router-dom";

class navBarComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
export default navBarComponent;

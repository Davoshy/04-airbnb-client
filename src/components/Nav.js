import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <Link to="/" className="logo" />
        <div className="profile">
          <Link to="/plus" className="button">
            <span>Airbnb Plus</span>
          </Link>
        </div>
      </nav>
    );
  }
}

export default Nav;

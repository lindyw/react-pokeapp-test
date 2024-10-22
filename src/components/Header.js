import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
class Header extends React.Component {
  // Methods
  renderBody = () => {
    if (this.props.view === "home") {
      return;
    } else if (this.props.view === "search") {
      return (
        <li className="header-li">
          > <Link to="/search">Pokemon</Link>
        </li>
      );
    } else {
      return (
        <li className="header-li">
          > <Link to="/search">Pokemon</Link> > {this.props.view}
        </li>
      );
    }
  };

  render() {
    return (
      <nav className="nav-bar">
        <div className="container">
          <div className="nav-menu w-clearfix">
            <img
              src="https://github.com/lindyw/react-pokeapp-test/blob/master/public/header_icon.png?raw=true"
              alt="pokemon search web app"
              className="app-logo"
            />
            <div className="nav-links">
              <ul className="header-ul">
                <li className="header-li">
                  <Link to="/">PokeApp</Link>
                </li>
                {this.renderBody()}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {

  // Methods
  renderBody = () => {
    if (this.props.view === "home")
    {
      return;
    }
    else if (this.props.view === "search")
    {
      return <li>> <Link to="/search">Search</Link></li>
    }
  }

  render(){
  	return (
      <nav className="navbar w-nav">
        <div className="container">
          <div className="nav-menu w-clearfix">
              <img
                src="header_icon.png"
                alt="pokemon search web app"
                className="app-logo"
              />
            <div className="nav-links">
              {/*<h2 className="navtitle">PokiSearch App</h2>*/}
              <ul>
            	  <li>
                  <Link to="/">PokeApp</Link>
                </li>
                  {this.renderBody()}
            </ul>
            </div>
            
          </div>
        </div>
      </nav>
      );
    };
}

export default Header;
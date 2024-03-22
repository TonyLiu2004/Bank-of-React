import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
import "./NavBar.css";
class NavBar extends Component {
  render() {
    return (
      <div id="NavBar-Container">
        <AccountBalance accountBalance={this.props.accountBalance} />
        <div id="Navbar-Links">
            <Link to="/" className="Link">Home</Link>
            <Link to="/userProfile" className="Link">User Profile</Link>
            <Link to="/credits" className="Link">Credits</Link>
            <Link to="/debits" className="Link">Debits</Link>
            <Link to="/login" className="Link">Login</Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
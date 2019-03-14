import React, {Component} from 'react';

class Menu extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty App</a>
        <p className="users-count">{this.props.users}</p>
      </nav>
    );
  }
}
export default Menu;
import React, { Component } from "react";
import { withOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    if (this.props.authState.isPending) {
      return <div>Loading...</div>;
    }

    const button = this.props.authState.isAuthenticated ? (
      <button
        className="ui item"
        onClick={() => {
          this.props.authService.logout();
        }}
      >
        Logout
      </button>
    ) : (
      <button
        className="ui item"
        onClick={() => {
          this.props.authService.login();
        }}
      >
        Login
      </button>
    );
    return (
      <div>
        <div className="ui secondary pointing menu" wfd-id="296">
          <Link to="/" className="item active">
            Home
          </Link>
          {this.props.authState.isAuthenticated === true && (
            <Link to="/item" className="item">
              Item
            </Link>
          )}
          <div className="right menu" wfd-id="297">
            {button}
          </div>
        </div>
        <div className="ui segment" wfd-id="295">
          <p></p>
        </div>
      </div>
    );
  }
}

export default withOktaAuth(Navbar);

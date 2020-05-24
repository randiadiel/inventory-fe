import React, { Component } from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withOktaAuth } from "@okta/okta-react";

export default withOktaAuth(
  class LoginForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        username: "",
        password: "",
      };

      this.oktaAuth = new OktaAuth({ issuer: props.issuer });

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();
      this.oktaAuth
        .signIn({
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          const sessionToken = res.sessionToken;
          this.setState(
            { sessionToken },
            // sessionToken is a one-use token, so make sure this is only called once
            () => this.props.authService.redirect({ sessionToken })
          );
        })
        .catch((err) => console.log("Found an error", err));
    }

    handleUsernameChange(e) {
      this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
      this.setState({ password: e.target.value });
    }

    render() {
      if (this.state.sessionToken) {
        // Hide form while sessionToken is converted into id/access tokens
        return null;
      }

      return (
        <div className="login-form">
          <div className="ui card">
            <div className="content">
              <div className="header">Login</div>
              <div className="meta">
                {Math.random()
                  .toString(36)
                  .replace(/[^a-z]+/g, "")
                  .substr(0, 5)}
              </div>
              <form onSubmit={this.handleSubmit} className="ui form">
                <div className="field">
                  <label>Username:</label>
                  <input
                    id="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  />
                </div>
                <div className="field">
                  <label>Password:</label>
                  <input
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>

                <input
                  className="ui button"
                  id="submit"
                  type="submit"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
);

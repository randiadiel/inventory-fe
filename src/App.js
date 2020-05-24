import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./AppWithRouterAccess";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <AppWithRouterAccess />
        </Router>
      </div>
    );
  }
}

export default App;

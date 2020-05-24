import React, { Component } from "react";
import Navbar from "../components/Navbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar active="0" />
        <div className="row">
          <h1 className="ui center aligned segment">
            RANDI's INVENTORY MANAGER
          </h1>
        </div>
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import { SideBar } from "./SideBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainDisplay from "./MainDisplay";

class Main extends Component {
  state = {};
  render() {
    return (
      <Router>
        <SideBar/>
        <MainDisplay />
      </Router>
    );
  }
}

export default Main;

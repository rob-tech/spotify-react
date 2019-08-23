import React, { Component } from "react";
import { SideBar } from "./SideBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainDisplay from "./MainDisplay";
import Artist from "./Artist";

class Main extends Component {
  state = {};
  render() {
    return (
      <Router>
        <SideBar />
        <Route path="/" component={MainDisplay} />
        <Route path="/album/:albumId" component={Artist} />
      </Router>
    );
  }
}

export default Main;

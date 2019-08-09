import React, { Component } from 'react';
import {SideBar} from './SideBar';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import{Container} from "reactstrap";
import MainDisplay from './MainDisplay'

class Main extends Component {
    state = {  }
    render() { 
        return ( 
        
        <Router>
     
            <SideBar/>        
            <Container fluid className="mainContent">
            <NavBar/>
            <MainDisplay/>
            </Container>
        </Router> )
    }
}
 
export default Main;
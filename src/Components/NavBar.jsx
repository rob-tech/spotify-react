import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Container,
  Nav,
  NavItem,
  NavLink,
  Input
} from "reactstrap";

class NavBar extends Component {
  state = {};
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  searchInput = input => {
    if (input.currentTarget.value.length >= 3) {
      this.props.triggerSearch(input.currentTarget.value);
    } else {
      this.props.triggerSearch("");
    }
  };

  render() {
    return (
      <Container fluid className="navContent">
        <Navbar className="nav" style={{ height: 60 }} expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink className="navlink" href="/">
                  HOME
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navlink" href="/accountprofile/">
                  ACCOUNT
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="navlink" href="#">
                  TRENDING
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <Nav className="ml-auto">

            <Input
              id="search"
              placeholder="search"
              onKeyUp={this.searchInput}
            />
      
          </Nav>
        </Navbar>
      </Container>
    );
  }
}

export default NavBar;

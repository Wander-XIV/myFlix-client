import React, { Fragment } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export function Navbar({ user }) {
  const isAuth = () => {
    let accessToken = localStorage.getItem("token");
    if (accessToken) {
      return accessToken;
    } else {
      return false;
    }
  };

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <Navbar bg="white" expand="lg" className="mb-3">
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {isAuth() && (
              <Fragment>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </Fragment>
            )}
            {!isAuth() && (
              <Fragment>
                <Nav.Link href={"/login"}>Login</Nav.Link>
                <Nav.Link href={"/register"}>Register</Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

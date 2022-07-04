import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./navbar.scss";

export default function Navbar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="mainNav"
      sticky="top"
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand className="logo" href="/">
          MyFlix Application
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ml-auto nav-items">
            {isAuth() && <Nav.Link href="/">Movies</Nav.Link>}
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Nav.Link
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Nav.Link>
            )}
            {!isAuth() && <Nav.Link href="/">Login</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Register</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { RootStateOrAny, useSelector } from "react-redux";
const Header = () => {
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.auth.isLoggedIn
  );
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">CodinTest</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn && <Nav.Link href="/login">Logout</Nav.Link>}
            {!isLoggedIn && (
              <>
                <Nav.Link href="/signup">Sign up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

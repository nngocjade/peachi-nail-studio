import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header className="my-3">
      <Navbar bg="light" expand="md">
        <Container fluid>
          <Navbar.Brand href="/">
            peachi
            <span className="mx-2 text-muted">nail studio</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-center">
            <Nav className="ml-auto">
              <Nav.Link href="/about">About us</Nav.Link>

              <Nav.Link href="/login">Login</Nav.Link>
              <Button type="button" className="btn btn-primary">
                <Nav.Link className="text-light" href="/reservation">
                  Book Now
                </Nav.Link>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

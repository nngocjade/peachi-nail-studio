import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="md">
        <Container fluid>
          <div className="logo">
            <div>
              <span className="h2">PEACHI</span>
            </div>
            <div className="text-muted">NAIL STUDIO</div>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-center">
            <Nav className="ml-auto">
              <Nav.Link href="/about">About us</Nav.Link>

              <Nav.Link href="/login">Login</Nav.Link>
              <Button type="button">
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

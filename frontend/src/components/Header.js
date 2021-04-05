import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/actions/userActions";

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" expand="md">
        <Container fluid>
          <LinkContainer to="/">
            <div className="logo">
              <div>
                <span className="h2">PEACHI</span>
              </div>
              <div className="text-muted">NAIL STUDIO</div>
            </div>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-center">
            <Nav className="ml-auto">
              <Nav.Link href="/about">About us</Nav.Link>
              <Nav.Link href="/nailGallery">Gallery</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
              {userInfo && !userInfo.isAdmin ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile/:id">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : !userInfo ? (
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              ) : (
                " "
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/profile/:id">
                    <NavDropdown.Item>Admin Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Client List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/naildesignlist">
                    <NavDropdown.Item>Nail Design List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/blogPostList">
                    <NavDropdown.Item>Blog Post List</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
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

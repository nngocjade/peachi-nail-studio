import React from "react";
import "../css/Login.css";
import { Form, NavLink, Button, Container, Row, Col } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className="login text-center">
      <p>login page</p>
      <p>
        Need an account? <NavLink href="/register">Create one.</NavLink>
      </p>
      <Container className="">
        <Row>
          <Col>
            <Form className="col-7 mx-auto">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;

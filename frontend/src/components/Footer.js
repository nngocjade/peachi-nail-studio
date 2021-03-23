import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="sticky-bottom">
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; PEACHI NAIL STUDIO
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="sticky-bottom">
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Peachi Nail Studio
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

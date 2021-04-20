import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <Container className="footer" fluid>
      <Row>
        <Col className="text-center py-3">
          <div> Copyrighted &copy; 2021, PEACHI NAIL STUDIO</div>
        </Col>
        <Col className="text-center py-3">
          <div>Designed and Developed with love by Jade</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;

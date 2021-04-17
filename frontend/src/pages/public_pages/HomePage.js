import React from "react";
import "../../css/Home.css";
import Logo from "../../peach.svg";
import NailPolish from "../../nail-polish.svg";
import { Container, Button, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="home" fluid="md">
      <div className="nail-polish-absolute">
        <div className="nail-polish-wrapper">
          <img
            className="wobble animated infinite nail-polish"
            src={NailPolish}
            alt="nail-polish"
          />
          <img
            className="wobble animated infinite nail-polish-front"
            src={NailPolish}
            alt="nail-polish"
          />
        </div>
      </div>
      <Row>
        <Col className="col-5 landing-content">
          <h1>Just Peachi</h1>
          <h2>Nails inspired by nature</h2>
          <div className="description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            magnam illum minima commodi dolorem quibusdam quod hic enim
            dignissimos excepturi.
          </div>
          <Button type="button" className="learn-more">
            <span>Learn more</span>
          </Button>
        </Col>
        <Col className="peach-wrapper">
          <img className="big-peach" src={Logo} alt="logo" />
          <img className="big-peach-front blink_me" src={Logo} alt="logo" />
        </Col>
      </Row>
      <Row>
        <div>About</div>
      </Row>
    </Container>
  );
};

export default HomePage;

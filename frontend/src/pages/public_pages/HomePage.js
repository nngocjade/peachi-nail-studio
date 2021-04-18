import React from "react";
import "../../css/Home.css";
import Logo from "../../svg/peach.svg";
import NailPolish from "../../svg/nail-polish.svg";
import BackgroundPeach from "../../svg/peach(1).svg";
import { Container, Button, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="home" fluid="md">
      {/* <div className="background-peach-wrapper">
        <img
          className="background-peach"
          src={BackgroundPeach}
          alt="background peach"
        />
      </div> */}
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
          <h4 style={{ padding: ".5em 1em" }}>inspired by joy</h4>
          <div className="description" style={{ paddingBottom: "1em" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
            magnam illum minima commodi dolorem quibusdam quod hic enim
            dignissimos excepturi.
          </div>
          <button
            type="button"
            className="learn-more btn"
            style={{ width: "14em", margin: "1em" }}
          >
            <span>Learn more</span>
          </button>
        </Col>
        <Col className="peach-col">
          <div className="peach-wrapper">
            <img className="big-peach" src={Logo} alt="logo" />
            <img className="big-peach-front blink_me" src={Logo} alt="logo" />
          </div>
        </Col>
      </Row>
      <Row className="services text-center ">
        <Col>Mani / Pedi</Col>
        <Col>Nail Design</Col>
        <Col>Gel</Col>
      </Row>
    </Container>
  );
};

export default HomePage;

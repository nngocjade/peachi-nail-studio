import React from "react";
import "../../css/Home.css";
import Logo from "../../peach.svg";
import { Container, Button, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="home" fluid="md">
      <Row>
        <div className="col-5">
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
        </div>
        <div className="peach-wrapper">
          <img
            className="big-peach"
            src={Logo}
            alt="logo"
            style={{
              filter: "blur(10px)",
            }}
          />
          <img className="big-peach-front" src={Logo} alt="logo" />
        </div>
      </Row>
    </Container>
  );
};

export default HomePage;

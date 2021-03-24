import React from "react";
import "../css/Home.css";
import Logo from "../peach.svg";
import { Container, Button, Row, Col } from "react-bootstrap";
import nailTrends from "../nailTrends.js";
import EachDesign from "../components/EachDesign";

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
          <Button type="button">Learn more</Button>
        </div>
        <div>
          <img className="big-peach" src={Logo} alt="logo" />
        </div>
      </Row>
      <Row>
        {nailTrends.map((eachDesign) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <EachDesign eachDesign={eachDesign} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;

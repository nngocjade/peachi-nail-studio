import React from "react";
import "../css/Home.css";
import Logo from "../peach.svg";
import { Container, Button } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="home" fluid="md">
      <div className="col-5">
        <h1>Just Peachi</h1>
        <h2>Nails inspired by nature</h2>
        <div className="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate
          magnam illum minima commodi dolorem quibusdam quod hic enim
          dignissimos excepturi.
        </div>
        <Button type="button">Sign up</Button>
      </div>
      <div>
        <img className="big-peach" src={Logo} alt="logo" />
      </div>
    </Container>
  );
};

export default HomePage;

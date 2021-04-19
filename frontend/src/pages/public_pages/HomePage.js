import React, { useState } from "react";
import "../../css/Home.css";
import Logo from "../../svg/peach.svg";
import NailPolish from "../../svg/nail-polish.svg";
import Blossom from "../../svg/cherry-blossom(3).svg";
import Petal from "../../svg/petal.svg";
import Manicure from "../../svg/manicure.svg";
import Pedicure from "../../svg/pedicure.svg";
import Design from "../../svg/nail-design.svg";
// import BackgroundPeach from "../../svg/peach(1).svg";
import { Container, Button, Row, Col } from "react-bootstrap";

const HomePage = () => {
  const [visible, setVisible] = useState(false);

  const makeNailPolishVisible = () => {
    if (window.scrollY >= 80) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", makeNailPolishVisible);

  return (
    <>
      <Container className="home">
        {/* <div className="background-peach-wrapper">
        <img
          className="background-peach"
          src={BackgroundPeach}
          alt="background peach"
        />
      </div> */}
        <div className="circle"></div>
        <div className="circle-one"></div>
        <div
          className={
            visible
              ? "nail-polish-absolute element-visible"
              : "nail-polish-absolute"
          }
        >
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate magnam illum minima commodi dolorem quibusdam quod hic
              enim dignissimos excepturi.
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
          <div className="blossom-wrapper">
            <img className="blossom" src={Blossom} alt="blossom" />
          </div>
          <div className="blossom-wrapper-one ">
            <img className="blossom-one" src={Blossom} alt="blossom" />
          </div>

          {/* <div className="card-list">
         
            <div className="card">
              <div className="pedicure">
                <img src={Pedicure} alt="pedicure" />
              </div>
              <div className="service-title">Pedicure</div>
            </div>
            <div className="petal-wrapper ">
              <img className="petal" src={Petal} alt="petal" />
            </div>
            <div className="petal-wrapper-one ">
              <img className="petal" src={Petal} alt="petal" />
            </div>
 
            <div className="card">
              <div className="design">
                <img src={Design} alt="design" />
              </div>
              <div className="service-title">Nail Design</div>
            </div>
      
            <div className="card">
              <div className="manicure">
                <img src={Manicure} alt="manicure" />
              </div>
              <div className="service-title">
                Manicure <span className="dot">•</span> Gel{" "}
                <span className="dot">•</span> Acrylic
              </div>
            </div>
          </div> */}
          <Col sm={12} md={6} lg={4}>
            <div className="card">
              <div className="manicure">
                <img src={Manicure} alt="manicure" />
              </div>
              <div className="service-title">
                Manicure <span className="dot">•</span> Gel{" "}
                <span className="dot">•</span> Acrylic
              </div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div className="card">
              <div className="design">
                <img src={Design} alt="design" />
              </div>
              <div className="service-title">Nail Design</div>
            </div>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <div className="card">
              <div className="pedicure">
                <img src={Pedicure} alt="pedicure" />
              </div>
              <div className="service-title">Pedicure</div>
            </div>
            <div className="petal-wrapper ">
              <img className="petal" src={Petal} alt="petal" />
            </div>
            <div className="petal-wrapper-one ">
              <img className="petal" src={Petal} alt="petal" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;

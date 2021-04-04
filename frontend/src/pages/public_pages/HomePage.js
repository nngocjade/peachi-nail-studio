import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/Home.css";
import Logo from "../../peach.svg";
import { Container, Button, Row, Col } from "react-bootstrap";
import EachDesign from "../../components/EachDesign";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listNailDesigns } from "../../redux/actions/nailDesignActions";

const HomePage = () => {
  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);

  console.log("nailDesignList", nailDesignList);

  const { loading, error, nailDesigns } = nailDesignList;

  useEffect(() => {
    dispatch(listNailDesigns());
  }, [dispatch]);

  return (
    <Container className="home" fluid="md">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <div className="col-5">
              <h1>Just Peachi</h1>
              <h2>Nails inspired by nature</h2>
              <div className="description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptate magnam illum minima commodi dolorem quibusdam quod hic
                enim dignissimos excepturi.
              </div>
              <Button type="button">Learn more</Button>
            </div>
            <div>
              <img className="big-peach" src={Logo} alt="logo" />
            </div>
          </Row>
          <Row>
            {nailDesigns.map((eachDesign) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <EachDesign eachDesign={eachDesign} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default HomePage;

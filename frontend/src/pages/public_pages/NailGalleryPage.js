import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import EachDesign from "../../components/EachDesign";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listNailDesigns } from "../../redux/actions/nailDesignActions";

const NailGalleryPage = () => {
  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);

  console.log("nailDesignList", nailDesignList);

  const { loading, error, nailDesigns } = nailDesignList;

  useEffect(() => {
    dispatch(listNailDesigns());
  }, [dispatch]);

  return (
    <Container className="nail-gallery" fluid="md">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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

export default NailGalleryPage;

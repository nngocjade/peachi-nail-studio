import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { listNailDesignDetails } from "../../redux/actions/nailDesignActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const NailGalleryDetailPage = ({ history, match }) => {
  // const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const nailDesignDetails = useSelector((state) => state.nailDesignDetails);

  const { loading, error, nailDesign } = nailDesignDetails;

  useEffect(() => {
    dispatch(listNailDesignDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md-6>
            <Image src={nailDesign.image} alt={nailDesign.name} fluid />
          </Col>
          <Col md-3>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{nailDesign.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {nailDesign.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                {/* PRICE */}
                <ListGroup.Item>
                  <Row>
                    <Col>Style:</Col>
                    <Col>
                      <strong>{nailDesign.style}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {/* STATUS */}
                <ListGroup.Item>
                  <Row>
                    <Col>Category:</Col>
                    <Col>{nailDesign.category}</Col>
                  </Row>
                </ListGroup.Item>
                {/* ADD TO FAVORITE */}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default NailGalleryDetailPage;

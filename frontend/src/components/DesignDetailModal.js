import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listNailDesignDetails } from "../redux/actions/nailDesignActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "../css/Modal.css";

const DesignDetailModal = ({ handleClose, show, history, choosenId }) => {
  const dispatch = useDispatch();

  const nailDesignDetails = useSelector((state) => state.nailDesignDetails);

  const { loading, error, nailDesign } = nailDesignDetails;

  useEffect(() => {
    if (choosenId) {
      dispatch(listNailDesignDetails(choosenId));
    }
  }, [dispatch, choosenId]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="design-detail-modal"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Row>
              <Col md-6>
                <Image src={nailDesign.imageUrl} alt={nailDesign.name} fluid />
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
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DesignDetailModal;

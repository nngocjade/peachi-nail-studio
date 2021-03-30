import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { listNailDesignDetails } from "../redux/actions/nailDesignActions";
// import {} from '../redux/constants/nailDesignConstants'

const NailDesignEditPage = ({ match, history }) => {
  const nailDesignId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const nailDesignDetails = useSelector((state) => state.nailDesignDetails);
  const { loading, error, nailDesign } = nailDesignDetails;

  console.log("nailDesignDetails", nailDesignDetails);

  useEffect(() => {
    if (!nailDesign.name || nailDesign._id !== nailDesignId) {
      // dispatch(listNailDesignDetails(nailDesignId));
    } else {
      setName(nailDesign.name);
      setImage(nailDesign.image);
      setCategory(nailDesign.category);
      setStyle(nailDesign.style);
      setDescription(nailDesign.description);
    }
  }, [nailDesign, dispatch, nailDesignId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // update nail design list
  };

  return (
    <>
      <Link to="/admin/nailDesignList" className="btn btn-light my-3">
        Go Back
      </Link>
      <Container className="text-center">
        <Row>
          <Col md={5}>
            <h1>Edit Nail Design</h1>
            {/* {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                {/* NAME */}
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* IMAGE */}
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* CATEGORY */}
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* STYLE */}
                <Form.Group controlId="style">
                  <Form.Label>Style</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter style"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* DESCRIPTION */}
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NailDesignEditPage;

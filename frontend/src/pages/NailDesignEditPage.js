import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import {
  listNailDesignDetails,
  updateNailDesign,
} from "../redux/actions/nailDesignActions";
import { NAILDESIGN_UPDATE_RESET } from "../redux/constants/nailDesignConstants.js";
import axios from "axios";

const NailDesignEditPage = ({ match, history }) => {
  const nailDesignId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const nailDesignDetails = useSelector((state) => state.nailDesignDetails);
  const { loading, error, nailDesign } = nailDesignDetails;

  const nailDesignUpdate = useSelector((state) => state.nailDesignUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = nailDesignUpdate;

  console.log("nailDesignDetails", nailDesignDetails);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: NAILDESIGN_UPDATE_RESET });
      history.push("/admin/nailDesignlist");
    } else {
      if (!nailDesign.name || nailDesign._id !== nailDesignId) {
        dispatch(listNailDesignDetails(nailDesignId));
      } else {
        setName(nailDesign.name);
        setImage(nailDesign.image);
        setCategory(nailDesign.category);
        setStyle(nailDesign.style);
        setDescription(nailDesign.description);
      }
    }
  }, [nailDesign, dispatch, nailDesignId, successUpdate, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateNailDesign({
        _id: nailDesignId,
        name,
        image,
        category,
        style,
        description,
      })
    );
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
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                  <Form.File
                    id="image-file"
                    label="Choose File"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
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

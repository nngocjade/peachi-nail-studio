import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message.js";
import Loader from "../../components/Loader";
import {
  listNailDesignDetails,
  updateNailDesign,
} from "../../redux/actions/nailDesignActions";
import { NAILDESIGN_UPDATE_RESET } from "../../redux/constants/nailDesignConstants.js";
import axios from "axios";
import UpdateButton from "../../components/UpdateButton.js";
import UploadButton from "../../components/UploadButton.js";

const NailDesignEditPage = ({ match, history }) => {
  const nailDesignId = match.params.id;

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
        setImageUrl(nailDesign.imageUrl);
        setCategory(nailDesign.category);
        setStyle(nailDesign.style);
        setDescription(nailDesign.description);
      }
    }
  }, [nailDesign, dispatch, nailDesignId, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateNailDesign({
        _id: nailDesignId,
        name,
        imageUrl,
        category,
        style,
        description,
      })
    );
  };

  // ============== CLOUDINARY IMAGE UPLOAD ==============
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "nngocjade",
      uploadPreset: "peachi",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        setImageUrl(result.info.url);
      }
    }
  );

  return (
    <Container className="text-center">
      <div style={{ display: "flex" }}>
        <Link to="/admin/nailDesignList" className="btn btn-light my-3">
          Go Back
        </Link>
      </div>
      <Row>
        <Col lg={10} className="mx-auto">
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
                  as="textarea"
                  rows={4}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* IMAGE */}
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <div className="image-input-wrapper">
                  <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  ></Form.Control>
                  <UploadButton myWidget={myWidget} />
                </div>
              </Form.Group>
              <UpdateButton />
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NailDesignEditPage;

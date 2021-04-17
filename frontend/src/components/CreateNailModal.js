import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createBlogPost } from "../redux/actions/blogPostActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import UpdateButton from "./UpdateButton";
import { createNailDesign } from "../redux/actions/nailDesignActions";
import UploadButton from "./UploadButton";

const CreatePostModal = ({ handleClose, show, setShow }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  const nailDesignCreate = useSelector((state) => state.nailDesignCreate);

  const { loading, error, nailDesign } = nailDesignCreate;

  // useEffect(() => {

  // }, [dispatch]);

  const submitHandler = (e) => {
    // dispatch create post
    e.preventDefault();
    dispatch(
      createNailDesign({ name, description, category, style, imageUrl })
    );
    setShow(false);
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
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="create-nail-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Post a Nail Design</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : ( */}
          <Form onSubmit={submitHandler}>
            {/* Name */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Category */}
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* Style */}
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
                rows={3}
                placeholder="Enter description text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* IMAGE */}
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Form.Control
                  type="text"
                  placeholder="Paste image url here or click upload"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                ></Form.Control>
                <UploadButton myWidget={myWidget} />
              </div>
            </Form.Group>
            <UpdateButton />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreatePostModal;

// name,
//   category,
//   style,
//   imageUrl,
//   description,

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

const CreatePostModal = ({ handleClose, show, setShow }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const tagValue = ["tips", "everyday", "pattern", "abstract", "wedding"];

  console.log("tag", tags);

  const dispatch = useDispatch();

  const blogPostCreate = useSelector((state) => state.blogPostCreate);

  const { loading, error, blogPost } = blogPostCreate;

  // useEffect(() => {

  // }, [dispatch]);

  const submitHandler = (e) => {
    // dispatch create post
    e.preventDefault();
    dispatch(createBlogPost({ title, body, tags, imageUrl }));
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
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : ( */}
          <Form onSubmit={submitHandler}>
            {/* Title */}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                // value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* BODY */}
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter body text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>

            {/* TAGS */}
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setTags(e.target.value)}
              >
                <option>Choose an option</option>{" "}
                {tagValue.map((tag) => (
                  <option>{tag}</option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* IMAGE */}
            <div>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Past image url here or click upload"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button onClick={() => myWidget.open()} variant="primary">
                Upload
              </Button>
            </div>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
          {/* )} */}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreatePostModal;

// title,
// body,
// tags,
// imageUrl,
// author,

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import Loader from "../../components/Loader";
import {
  listBlogPostDetails,
  updateBlogPost,
} from "../../redux/actions/blogPostActions";
import { Link } from "react-router-dom";
import { BLOGPOST_UPDATE_RESET } from "../../redux/constants/blogPostConstants";
import Message from "../../components/Message";
import UpdateButton from "../../components/UpdateButton";

const BlogPostEditPage = ({ match, history }) => {
  const blogPostId = match.params.id;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const tagValue = ["tips", "everyday", "pattern", "abstract", "wedding"];

  const dispatch = useDispatch();

  const blogPostDetails = useSelector((state) => state.blogPostDetails);
  const { loading, error, blogPost } = blogPostDetails;

  const blogPostUpdate = useSelector((state) => state.blogPostUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = blogPostUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOGPOST_UPDATE_RESET });
      history.push("/admin/blogPostlist");
    }
    if (blogPost._id !== blogPostId) {
      dispatch(listBlogPostDetails(blogPostId));
    } else {
      setTitle(blogPost.title);
      setBody(blogPost.body);
      setTags(blogPost.tags);
      setImageUrl(blogPost.imageUrl);
    }
  }, [dispatch, blogPostId, blogPost._id, history, blogPost, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateBlogPost({
        _id: blogPostId,
        title,
        body,
        imageUrl,
        tags,
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
    <Container>
      <Row>
        <Col>
          <Link to="/admin/blogPostList" className="btn btn-light my-3">
            Go Back
          </Link>
          <h1 className="text-center">Edit Blog Post</h1>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : !loading ? (
            <>
              <Form onSubmit={submitHandler}>
                {/* Title */}
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
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
                    {tagValue.map((tag) => (
                      <option>{tag}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* IMAGE */}
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <div className="image-input-wrapper">
                    <Form.Control
                      type="text"
                      placeholder="Enter image url or upload"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    ></Form.Control>
                    <Button onClick={() => myWidget.open()} variant="primary">
                      Upload
                    </Button>
                  </div>
                </Form.Group>
                <UpdateButton />
              </Form>
            </>
          ) : (
            "error"
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPostEditPage;

// title: {
//   type: String,
// },
// description: {
//   type: String,
// },
// creator: {
//   type: String,
// },
// tags: {
//   type: [String],
// },
// selectedFile: {
//   type: String,
// },
// linkCount: {
//   type: Number,
//   default: 0,
// },
// createdAt: {
//   type: Date,
//   default: new Date(),
// },

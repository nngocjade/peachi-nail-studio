import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Loader";
import { list, listBlogPostDetails } from "../redux/actions/blogPostActions";

const BlogPostEditPage = ({ match }) => {
  const blogPostId = match.params.id;

  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("sample description");
  const [creator, setCreator] = useState("creator");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const blogPostDetails = useSelector((state) => state.blogPostDetails);
  const { loading, error, blogPost } = blogPostDetails;

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

  useEffect(() => {
    if (blogPost._id !== blogPostId) {
      dispatch(listBlogPostDetails(blogPostId));
    } else {
      setTitle(blogPost.title);
      setDescription(blogPost.description);
      setCreator(blogPost.creator);
      setTags(blogPost.tags);
      setImage(blogPost.image);
    }
  }, [dispatch, blogPostId, blogPost._id]);

  const submitHandler = () => {
    // dispatch create blog post
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1>Edit Blog Post</h1>
          <h2>Form:</h2>
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

            {/* CREATOR */}
            <Form.Group controlId="creator">
              <Form.Label>Creator</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter creator name"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* TAGS */}
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
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

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
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

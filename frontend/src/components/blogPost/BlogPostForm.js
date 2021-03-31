import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Loader from "../Loader";

const BlogPostForm = () => {
  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("sample description");
  const [creator, setCreator] = useState("creator");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const submitHandler = () => {
    // dispatch create blog post
  };
  return (
    <>
      <h1>Creat a Blog Post</h1>
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
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BlogPostForm;

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

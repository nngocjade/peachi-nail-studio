import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const BlogPost = ({ blogPost }) => {
  const defaultImage =
    "https://image.freepik.com/free-vector/cute-pink-peach-sliced-seamless-patten_39151-367.jpg";
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Img variant="top" src={blogPost.image} />
        <Card.Body>
          <Card.Title>{blogPost.title}</Card.Title>
          <Card.Text>{blogPost.description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Link to={`/blogPost/${blogPost._id}`}> More details...</Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default BlogPost;

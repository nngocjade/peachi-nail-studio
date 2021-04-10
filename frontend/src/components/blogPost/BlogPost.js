import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const BlogPost = ({ blogPost }) => {
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Link to={`/blogPost/${blogPost._id}`}>
          <Card.Img variant="top" src={blogPost.image} />
        </Link>
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

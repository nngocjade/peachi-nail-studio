import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const BlogPost = ({ blogPost }) => {
  const defaultImage =
    "https://image.freepik.com/free-vector/cute-pink-peach-sliced-seamless-patten_39151-367.jpg";
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={blogPost.image} />
        <Card.Body>
          <Card.Title>{blogPost.title}</Card.Title>
          <Card.Text>{blogPost.description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogPost;

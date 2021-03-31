import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const BlogPost = () => {
  const defaultImage =
    "https://image.freepik.com/free-vector/cute-pink-peach-sliced-seamless-patten_39151-367.jpg";
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={defaultImage} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
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

import React from "react";
import { Card } from "react-bootstrap";
import "../css/Card.css";

const EachDesign = ({ eachDesign }) => {
  return (
    <Card className="my-3 p-3 rounded eachDesign">
      <Card.Img src={eachDesign.image} variant="top"></Card.Img>
      <Card.Body>
        <div className="heart">
          <i class="far fa-heart"></i>
        </div>
        {/* <Link to={`/product/${eachDesign._id}`}> */}
        {/* <Card.Title as="div">
          <strong>{eachDesign.name}</strong>
        </Card.Title> */}
        {/* </Link> */}
        {/* <Card.Text as="div">
          <Rating
            value={eachDesign.rating}
            text={`${eachDesign.numReviews} reviews`}
          />
        </Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default EachDesign;
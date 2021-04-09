import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/Card.css";

const EachDesign = ({ eachDesign, handleShow }) => {
  return (
    <Card
      onClick={() => handleShow(eachDesign._id)}
      className="my-3 p-3 rounded eachDesign"
      style={{
        border: "none",
        boxShadow: "0 8px 10px 5px lightGray",
        backgroundColor: "transparent",
        // backdropFilter: "blur(10px)",
        backdropFilter: "blur(50px)",
      }}
    >
      <Card.Img src={eachDesign.image} variant="top"></Card.Img>

      <div className="heart">
        <i class="far fa-heart"></i>
      </div>
      <div className="title">{eachDesign.name}</div>
    </Card>
  );
};

export default EachDesign;

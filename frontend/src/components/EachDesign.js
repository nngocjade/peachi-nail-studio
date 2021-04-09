import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../css/Card.css";
import { addToFavorite } from "../redux/actions/userActions";

const EachDesign = ({ eachDesign, handleShow }) => {
  const dispatch = useDispatch();

  const handleAddToFavorite = () => {
    dispatch(addToFavorite(eachDesign._id));
  };

  return (
    <Card
      className="my-3 p-3 rounded eachDesign"
      style={{
        border: "none",
        boxShadow: "0 8px 10px 5px lightGray",
        backgroundColor: "transparent",
        // backdropFilter: "blur(10px)",
        backdropFilter: "blur(50px)",
      }}
    >
      <Card.Img
        onClick={() => handleShow(eachDesign._id)}
        src={eachDesign.image}
        variant="top"
      ></Card.Img>

      <div className="heart">
        <i class="far fa-heart" onClick={handleAddToFavorite}></i>
      </div>
      <div className="title">{eachDesign.name}</div>
    </Card>
  );
};

export default EachDesign;

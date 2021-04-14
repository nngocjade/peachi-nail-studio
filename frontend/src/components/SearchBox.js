import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../css/SearchBox.css";

const SearchBox = ({ history, submitHandler, setKeyword }) => {
  return (
    <Form onSubmit={submitHandler} inline className="search-box">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search design..."
        className="search-txt"
        autoComplete="off"
      ></Form.Control>
      <Button type="submit" className="p-2 search-btn">
        <i class="fas fa-search"></i>
      </Button>
    </Form>
  );
};

export default SearchBox;

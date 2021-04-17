import React from "react";
import { Button } from "react-bootstrap";

const UploadButton = ({ myWidget }) => {
  return (
    <Button onClick={() => myWidget.open()} variant="primary">
      <i
        class="fas fa-arrow-up"
        style={{
          width: "1.5em",
          height: "2em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></i>
    </Button>
  );
};

export default UploadButton;

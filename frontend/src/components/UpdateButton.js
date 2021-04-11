import React from "react";
import { Button } from "react-bootstrap";

const UpdateButton = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="primary"
        type="submit"
        style={{
          height: "2.5em",
          width: "7em",
          margin: "1.5em 0 2em 0",
        }}
      >
        Update
      </Button>
    </div>
  );
};

export default UpdateButton;

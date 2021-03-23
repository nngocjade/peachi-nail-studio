import React from "react";
import { NavLink } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div>
      <p>login page</p>
      <p>
        Need an account? <NavLink href="/register">Create one.</NavLink>
      </p>
    </div>
  );
};

export default LoginPage;

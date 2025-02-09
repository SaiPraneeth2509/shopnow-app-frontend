// src/components/ui/Error.jsx
import React from "react";

const Error = ({ message }) => {
  return (
    <div className="text-center my-5">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Oops! Something went wrong.</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Error;

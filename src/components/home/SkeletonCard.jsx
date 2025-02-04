// src/components/home/SkeletonCard.jsx
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card h-100 shadow-sm">
      <div
        className="card-img-top bg-light"
        style={{ height: "200px", objectFit: "cover" }}
      ></div>
      <div className="card-body">
        <div
          className="card-title bg-light w-75 mb-3"
          style={{ height: "24px" }}
        ></div>
        <div
          className="card-text bg-light w-50 mb-3"
          style={{ height: "20px" }}
        ></div>
        <div
          className="btn btn-primary w-100 bg-light"
          style={{ height: "38px" }}
        ></div>
      </div>
    </div>
  );
};

export default SkeletonCard;

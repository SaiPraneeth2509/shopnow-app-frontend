import React from "react";
import Header from "./Header";
import CardContainer from "./CardContainer";

const Home = ({ updateCartCount }) => {
  return (
    <div>
      <Header />
      <CardContainer updateCartCount={updateCartCount} />
    </div>
  );
};

export default Home;

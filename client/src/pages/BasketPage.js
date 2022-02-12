import React from 'react';
import BasketNav from "../components/basketNav";
import Header from "../components/header";
import BasketViews from "../components/basketViews";

const BasketPage = () => {
  return (
    <>
      <Header/>
      <BasketNav/>
      <BasketViews/>
    </>
  );
};

export default BasketPage;

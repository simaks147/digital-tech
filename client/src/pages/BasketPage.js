import React from 'react';
import BasketNav from "../components/basketNav";
import BasketList from "../components/basketList";
import Header from "../components/header";

const BasketPage = () => {
  return (
    <>
      <Header/>
      <BasketNav/>
      <BasketList/>
    </>
  );
};

export default BasketPage;

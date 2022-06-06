import React from 'react';
import BasketNav from "../components/basketNav";
import BasketViews from "../components/basketViews";
import Layout from "../components/Layout";
import {Redirect} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const BasketPage = () => {
  const token = true;

  if (!token) return <Redirect to={LOGIN_ROUTE}/>;

  return (
    <Layout>
      <BasketNav/>
      <BasketViews/>
    </Layout>
  );
}

export default BasketPage;

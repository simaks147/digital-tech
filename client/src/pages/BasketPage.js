import React from 'react';
import BasketNav from "../components/basketNav";
import BasketViews from "../components/basketViews";
import Layout from "../components/Layout";

const BasketPage = () => (
  <Layout>
    <BasketNav/>
    <BasketViews/>
  </Layout>
);

export default BasketPage;

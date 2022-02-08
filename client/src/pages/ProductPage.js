import React from 'react';
import Product from "../components/product";

const ProductPage = ({match}) => {
  return (
    <>
      <Product id={match.params.slug}/>
    </>
  );
};

export default ProductPage;

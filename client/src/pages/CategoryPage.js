import React from 'react';
import ProductList from "../components/productList";

const CategoryPage = ({match}) => {
  return (
    <>
      <ProductList subcategoryId={match.params.slug}/>
    </>
  );
}

export default CategoryPage;

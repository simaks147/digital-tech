import React from 'react';
import ProductList from "../components/productList";
import Header from "../components/header";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {categoriesListSelector} from "../redux/selectors";

const CategoryPage = ({match, categories}) => {
  if (!match.params.slug) return <Redirect to={`/category/${categories[0].subcategory[0].slug}`}/>

  return (
    <>
      <Header/>
      <ProductList subcategoryId={match.params.slug}/>
    </>
  );
}

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state)
});

export default connect(mapStateToProps)(CategoryPage);

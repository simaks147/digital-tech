import React from 'react';
import Product from "../components/product";
import Header from "../components/header";
import {Redirect} from "react-router-dom";
import {categoriesListSelector} from "../redux/selectors";
import {connect} from "react-redux";

const ProductPage = ({match, categories}) => {
  if (!match.params.slug) return <Redirect to={`/category/${categories[0].subcategory[0].slug}`}/>

  return (
    <>
      <Header/>
      <Product id={match.params.slug}/>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state)
});

export default connect(mapStateToProps)(ProductPage);

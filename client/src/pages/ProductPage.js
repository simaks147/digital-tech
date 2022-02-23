import React from 'react';
import Product from "../components/product";
import {Redirect} from "react-router-dom";
import {categoriesListSelector} from "../redux/selectors";
import {connect} from "react-redux";
import {CATEGORY_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";

const ProductPage = ({match, categories}) => {
  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>

  return (
    <Layout>
      <Product id={match.params.slug}/>
    </Layout>
  );
};

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state)
});

export default connect(mapStateToProps)(ProductPage);

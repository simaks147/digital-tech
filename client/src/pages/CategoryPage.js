import React from 'react';
import ProductList from "../components/productList";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {categoriesListSelector} from "../redux/selectors";
import {CATEGORY_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";

const CategoryPage = ({match, categories}) => {
  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>

  return (
    <>
      <Layout>
        <ProductList subcategoryId={match.params.slug}/>
      </Layout>
    </>
  );
}

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state)
});

export default connect(mapStateToProps)(CategoryPage);

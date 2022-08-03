import React from 'react';
import ProductList from "../components/productList";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {categoriesListSelector} from "../redux/selectors";
import {CATEGORY_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";
import {PRODUCTS_LIMIT_VARIANTS, PRODUCTS_SORT_VARIANTS} from "../utils/consts";

const CategoryPage = ({match, categories}) => {
  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>

  return (
    <Layout>
      <ProductList
        subcategoryId={match.params.slug}
        limitVariants={PRODUCTS_LIMIT_VARIANTS}
        sortVariants={PRODUCTS_SORT_VARIANTS}
      />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  categories: categoriesListSelector(state)
});

export default connect(mapStateToProps)(CategoryPage);

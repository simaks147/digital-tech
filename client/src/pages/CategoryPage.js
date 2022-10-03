import React from 'react';
import ProductList from "../components/productList";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {categoriesListSelector, subcategoriesSelector} from "../redux/selectors";
import {CATEGORY_ROUTE, ERROR_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";
import {PRODUCTS_LIMIT_VARIANTS, PRODUCTS_SORT_VARIANTS} from "../utils/consts";
import {PropTypes as Types} from "prop-types";

const CategoryPage = ({match, subcategories, categories}) => {
  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>
  if (!subcategories[match.params.slug]) return <Redirect to={ERROR_ROUTE}/>

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

CategoryPage.propTypes = {
  categories: Types.arrayOf(Types.shape({
    subcategory: Types.arrayOf(Types.shape({
      slug: Types.string.isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired,
  subcategories: Types.objectOf(Types.object).isRequired
};

const mapStateToProps = (state) => ({
  categories: categoriesListSelector(state),
  subcategories: subcategoriesSelector(state)
});

export default connect(mapStateToProps)(CategoryPage);

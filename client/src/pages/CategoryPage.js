import React, {useState} from 'react';
import ProductList from "../components/productList";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {categoriesListSelector, routerSelector} from "../redux/selectors";
import {CATEGORY_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";

const CategoryPage = ({match, categories, queryParams}) => {
  const [page, setPage] = useState(queryParams.page);
  const [limit, setLimit] = useState(queryParams.limit);

  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>

  return (
    <Layout>
      <ProductList subcategoryId={match.params.slug}/>
    </Layout>
  );
};

const mapStateToProps = (state, props) => ({
  categories: categoriesListSelector(state),
  queryParams: routerSelector(state).location.query
});

export default connect(mapStateToProps)(CategoryPage);

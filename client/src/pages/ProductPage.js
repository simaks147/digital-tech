import React, {useEffect} from 'react';
import Product from "../components/product";
import {Redirect} from "react-router-dom";
import {
  activeSubCategoryByProductSelector,
  categoriesListSelector,
  errorRelationsSelector,
  loadingRelationsSelector,
  relationsListSelector
} from "../redux/selectors";
import {connect} from "react-redux";
import {CATEGORY_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";
import ProductSecondList from "../components/productSecondList";
import {loadRelations} from "../redux/actions";

const ProductPage = ({match, categories, relations, loadRelations, loadingRelations, errorsRelations, subcategoryId}) => {
  useEffect(() =>  {
    if (subcategoryId) loadRelations(subcategoryId)
  }, [subcategoryId, match.params.slug]);

  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>

  return (
    <Layout>
      <Product id={match.params.slug}/>
      <ProductSecondList
        title='Related Products'
        products={relations}
        loading={loadingRelations}
        errors={errorsRelations}
      />
    </Layout>
  );
};

const mapStateToProps = (state, props) => ({
  relations: relationsListSelector(state),
  categories: categoriesListSelector(state),
  loadingRelations: loadingRelationsSelector(state),
  errorsRelations: errorRelationsSelector(state),
  subcategoryId: activeSubCategoryByProductSelector(state, {id: props.match.params.slug})
});

export default connect(mapStateToProps, {loadRelations})(ProductPage);

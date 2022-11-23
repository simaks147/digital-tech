import React, {useEffect} from 'react';
import Product from "../components/product";
import {Redirect} from "react-router-dom";
import {
  activeSubCategoryByProductSelector,
  categoriesListSelector,
  errorRelationsSelector,
  loadingRelationsSelector,
  productsSelector,
  relationsListSelector
} from "../redux/selectors";
import {connect} from "react-redux";
import {CATEGORY_ROUTE} from "../utils/consts";
import Layout from "../components/Layout";
import ProductSecondList from "../components/productSecondList";
import {loadRelations} from "../redux/actions";
import {PropTypes as Types} from "prop-types";

const ProductPage = ({
                       match,
                       products,
                       categories,
                       relations,
                       loadRelations,
                       loadingRelations,
                       errorsRelations,
                       subcategoryId
                     }) => {
  useEffect(() => {
    if (subcategoryId) loadRelations(subcategoryId)
  }, [subcategoryId, match.params.slug]);

  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`}/>

  return (
    <Layout pageTitle={products[match.params.slug]?.title} pageDescription={products[match.params.slug]?.title}>
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

ProductPage.ptopTypes = {
  products: Types.objectOf(Types.object).isRequired,
  categories: Types.arrayOf(Types.shape({
    subcategory: Types.arrayOf(Types.shape({
      slug: Types.string.isRequired
    }).isRequired).isRequired
  }).isRequired).isRequired,
  relations: Types.arrayOf(Types.object),
  loadRelations: Types.func.isRequired,
  loadingRelations: Types.bool,
  errorsRelations: Types.arrayOf(Types.string),
  subcategoryId: Types.string.isRequired
};

const mapStateToProps = (state, props) => ({
  products: productsSelector(state),
  relations: relationsListSelector(state),
  categories: categoriesListSelector(state),
  loadingRelations: loadingRelationsSelector(state),
  errorsRelations: errorRelationsSelector(state),
  subcategoryId: activeSubCategoryByProductSelector(state, {id: props.match.params.slug})
});

export default connect(mapStateToProps, {loadRelations})(ProductPage);

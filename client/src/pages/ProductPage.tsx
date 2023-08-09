import React, { FC, useEffect } from 'react';
import Product from "../components/product";
import { Redirect, RouteComponentProps } from "react-router-dom";
import {
  activeSubCategoryByProductSelector,
  categoriesListSelector,
  errorRelationsSelector,
  loadingRelationsSelector,
  productsSelector,
  relationsListSelector
} from "../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { CATEGORY_ROUTE } from "../utils/consts";
import Layout from "../components/Layout";
import ProductSecondList from "../components/productSecondList";
import { loadRelations } from "../redux/actions";
import { RootStateType } from '../redux/store';

interface IOwnProps { }

interface IRoutParams {
  slug: string
}

type IProps = IOwnProps & PropsFromRedux & RouteComponentProps<IRoutParams>

const ProductPage: FC<IProps> = ({
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

  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`} />

  return (
    <Layout pageTitle={products[match.params.slug]?.title} pageDescription={products[match.params.slug]?.title}>
      <Product id={match.params.slug} />
      <ProductSecondList
        title='Related Products'
        products={relations}
        loading={loadingRelations}
        errors={errorsRelations}
      />
    </Layout>
  );
};

const mapStateToProps = (state: RootStateType, props: RouteComponentProps<IRoutParams>) => ({
  products: productsSelector(state),
  relations: relationsListSelector(state),
  categories: categoriesListSelector(state),
  loadingRelations: loadingRelationsSelector(state),
  errorsRelations: errorRelationsSelector(state),
  subcategoryId: activeSubCategoryByProductSelector(state, { id: props.match.params.slug })
});

const connector = connect(mapStateToProps, { loadRelations });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProductPage);

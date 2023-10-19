import React, { FC } from 'react';
import ProductList from "../components/productList";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { categoriesListSelector, subcategoriesSelector } from "../redux/selectors";
import { CATEGORY_ROUTE, ERROR_ROUTE } from "../utils/consts";
import Layout from "../components/Layout";
import { RootStateType } from '../redux/store';

interface IRoutParams {
  slug: string
}

interface IProps extends PropsFromRedux, RouteComponentProps<IRoutParams> { }

const CategoryPage: FC<IProps> = ({ match, subcategories, categories }) => {
  if (!match.params.slug) return <Redirect to={`${CATEGORY_ROUTE}/${categories[0].subcategory[0].slug}`} />
  if (!subcategories[match.params.slug]) return <Redirect to={ERROR_ROUTE} />

  return (
    <Layout pageTitle={subcategories[match.params.slug].title} pageDescription={subcategories[match.params.slug].title}>
      <ProductList />
    </Layout>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  categories: categoriesListSelector(state),
  subcategories: subcategoriesSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(CategoryPage);

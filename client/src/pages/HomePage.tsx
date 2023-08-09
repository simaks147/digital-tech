import React, { FC, useEffect } from 'react';
import Layout from "../components/Layout";
import Slider from "../components/slider";
import ProductSecondList from "../components/productSecondList";
import SubcategoriesGrid from "../components/subcategoriesGrid";
import { connect, ConnectedProps } from "react-redux";
import { loadRecommendations, loadSale } from "../redux/actions";
import {
  recommendationsListSelector,
  errorRecommendationsSelector,
  loadingRecommendationsSelector,
  saleListSelector,
  errorSaleSelector,
  loadingSaleSelector,
} from "../redux/selectors";
import { RootStateType } from '../redux/store';

interface IProps extends PropsFromRedux { }

const HomePage: FC<IProps> = ({
  recommendations,
  loadRecommendations,
  loadingRecommendations,
  errorsRecommendations,
  sale,
  loadSale,
  loadingSale,
  errorsSale
}) => {
  useEffect(() => {
    loadSale();
    loadRecommendations();
  });

  return (
    <Layout pageTitle="Home" pageDescription="Home">
      <Slider
        products={sale}
        loading={loadingSale}
        errors={errorsSale}
      />
      <SubcategoriesGrid />
      <ProductSecondList
        title='Featured Products'
        products={recommendations}
        loading={loadingRecommendations}
        errors={errorsRecommendations}
      />
    </Layout>
  );
}

const mapStateToProps = (state: RootStateType) => ({
  recommendations: recommendationsListSelector(state),
  loadingRecommendations: loadingRecommendationsSelector(state),
  errorsRecommendations: errorRecommendationsSelector(state),
  sale: saleListSelector(state),
  loadingSale: loadingSaleSelector(state),
  errorsSale: errorSaleSelector(state),
});

const connector = connect(mapStateToProps, { loadRecommendations, loadSale });

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(HomePage);

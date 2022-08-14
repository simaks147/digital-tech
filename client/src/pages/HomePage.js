import React, {useEffect} from 'react';
import Slider from "../components/slider";
import Layout from "../components/Layout";
import ProductSecondList from "../components/productSecondList";
import {connect} from "react-redux";
import {loadRecommendations, loadSale} from "../redux/actions";
import {
  recommendationsListSelector,
  errorRecommendationsSelector,
  loadingRecommendationsSelector,
  saleListSelector,
  errorSaleSelector,
  loadingSaleSelector,
} from "../redux/selectors";

const HomePage = ({
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
    loadRecommendations();
    loadSale();
  }, []);

  return (
    <Layout>
      <Slider
        products={sale}
        loading={loadingSale}
        errors={errorsSale}
      />
      <ProductSecondList
        title='Featured Products'
        products={recommendations}
        loading={loadingRecommendations}
        errors={errorsRecommendations}
      />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  recommendations: recommendationsListSelector(state),
  loadingRecommendations: loadingRecommendationsSelector(state),
  errorsRecommendations: errorRecommendationsSelector(state),
  sale: saleListSelector(state),
  loadingSale: loadingSaleSelector(state),
  errorsSale: errorSaleSelector(state),
});

export default connect(mapStateToProps, {loadRecommendations, loadSale})(HomePage);

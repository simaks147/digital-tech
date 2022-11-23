import React, {useEffect} from 'react';
import Layout from "../components/Layout";
import Slider from "../components/slider";
import ProductSecondList from "../components/productSecondList";
import SubcategoriesGrid from "../components/subcategoriesGrid";
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
import {PropTypes as Types} from "prop-types";

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
      <SubcategoriesGrid/>
      <ProductSecondList
        title='Featured Products'
        products={recommendations}
        loading={loadingRecommendations}
        errors={errorsRecommendations}
      />
    </Layout>
  );
}

HomePage.ptopTypes = {
  recommendations: Types.arrayOf(Types.object),
  loadRecommendations: Types.func.isRequired,
  loadingRecommendations: Types.bool,
  errorsRecommendations: Types.arrayOf(Types.string),
  sale: Types.arrayOf(Types.object),
  loadSale: Types.func.isRequired,
  loadingSale: Types.bool,
  errorsSale: Types.arrayOf(Types.string)
};

const mapStateToProps = (state) => ({
  recommendations: recommendationsListSelector(state),
  loadingRecommendations: loadingRecommendationsSelector(state),
  errorsRecommendations: errorRecommendationsSelector(state),
  sale: saleListSelector(state),
  loadingSale: loadingSaleSelector(state),
  errorsSale: errorSaleSelector(state),
});

export default connect(mapStateToProps, {loadRecommendations, loadSale})(HomePage);

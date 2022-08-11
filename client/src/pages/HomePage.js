import React, {useEffect} from 'react';
import Slider from "../components/slider";
import Layout from "../components/Layout";
import ProductSecondList from "../components/productSecondList";
import {connect} from "react-redux";
import {loadRecommendations} from "../redux/actions";
import {
  errorRecommendationsSelector,
  loadingRecommendationsSelector,
  recommendationsListSelector
} from "../redux/selectors";

const HomePage = ({recommendations, loadRecommendations, loadingRecommendations, errorsRecommendations}) => {
  useEffect(loadRecommendations, []);

  return (
    <Layout>
      <Slider
        products={recommendations}
        loading={loadingRecommendations}
        errors={errorsRecommendations}
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
  errorsRecommendations: errorRecommendationsSelector(state)
});

export default connect(mapStateToProps, {loadRecommendations})(HomePage);

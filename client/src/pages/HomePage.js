import React, {useEffect} from 'react';
import Slider from "../components/slider";
import Layout from "../components/Layout";
import ProductSecondList from "../components/productSecondList";
import {connect} from "react-redux";
import {loadProductsList} from "../redux/actions";
import {productsListSelector} from "../redux/selectors";

const HomePage = ({recommendedProducts, loadProductsList}) => {
  useEffect(loadProductsList, []);
  return (
    <Layout>
      <Slider/>
      <ProductSecondList title='Featured Products' products={recommendedProducts}/>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  recommendedProducts: productsListSelector(state),
});

export default connect(mapStateToProps, {loadProductsList})(HomePage);

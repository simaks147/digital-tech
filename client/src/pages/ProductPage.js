import React from 'react';
import {productIdBySlugSelector} from "../redux/selectors";
import Product from "../components/product";
import {connect} from "react-redux";

const ProductPage = ({id}) => {
  return (
    <>
      <Product id={id}/>
    </>
  );
};

const mapStateToProps = (state, props) => ({
  id: productIdBySlugSelector(state, props)
})

export default connect(mapStateToProps)(ProductPage);

import React from 'react';
import styles from './product.module.css';
import {connect} from "react-redux";
import {productSelector} from "../../redux/selectors";


const Product = ({product}) => (
  <div>
    {product.title}
  </div>
);

const mapStateToProps = (state, props) => ({
  product: productSelector(state, props)
})

export default connect(mapStateToProps)(Product);

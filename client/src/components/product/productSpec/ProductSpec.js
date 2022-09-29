import React from 'react';
import styles from "./productSpec.module.css";
import {PropTypes as Types} from "prop-types";

const ProductSpec = ({specification}) => (
  <div className={styles.main}>
    {
      specification.map(({title, description}, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.itemName}>{title}</div>
          <div className={styles.itemValue}>{description}</div>
        </div>)
      )
    }
  </div>
);

ProductSpec.propTypes = {
  specification: Types.arrayOf(Types.shape({
    title: Types.string,
    description: Types.string
  })).isRequired
};

export default ProductSpec;

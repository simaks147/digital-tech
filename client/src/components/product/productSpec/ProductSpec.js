import React from 'react';
import styles from "./productSpec.module.css";

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

export default ProductSpec;

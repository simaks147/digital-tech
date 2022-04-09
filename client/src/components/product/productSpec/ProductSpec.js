import React from 'react';
import styles from "./productSpec.module.css";

const ProductSpec = ({specification}) => (
  <div className={styles.main}>
    {
      // specification.map(({name, value}) => (
      //   <div key={name} className={styles.item}>
      //     <div className={styles.itemName}>{name}</div>
      //     <div className={styles.itemValue}>{value}</div>
      //   </div>)
      // )
      Object.entries(specification).map(([name, value]) => (
        <div key={name} className={styles.item}>
          <div className={styles.itemName}>{name}</div>
          <div className={styles.itemValue}>{value}</div>
        </div>)
      )
    }
  </div>
);

export default ProductSpec;

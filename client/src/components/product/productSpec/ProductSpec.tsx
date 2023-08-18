import React, { FC } from 'react';
import styles from "./productSpec.module.css";
import { IProduct } from '../../../redux/types/products';

type IProps = Pick<IProduct, 'specification'>

const ProductSpec: FC<IProps> = ({ specification }) => (
  <div className={styles.main}>
    {
      specification.map(({ title, description }, i) => (
        <div key={i} className={styles.item}>
          <div>{title}</div>
          <div>{description}</div>
        </div>)
      )
    }
  </div>
);

export default ProductSpec;

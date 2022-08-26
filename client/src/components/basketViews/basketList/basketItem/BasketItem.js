import React from 'react';
import styles from "./BasketItem.module.css";
import {connect} from "react-redux";
import {
  increaseCart,
  decreaseCart,
  removeFromCart
} from "../../../../redux/actions";
import {Link} from "react-router-dom";
import {PRODUCT_ROUTE} from "../../../../utils/consts";
import {images} from "../../../../config";
import {IKImage} from 'imagekitio-react';

const BasketItem = ({item, increaseCart, decreaseCart, removeFromCart}) => (
  <tr>
    <td className={styles.picture}>
      <Link to={`${PRODUCT_ROUTE}/${item.slug}`}>
        <IKImage
          urlEndpoint={images.urlEndpoint}
          path={item.images[0]}
          transformation={[{
            height: 88,
            width: 88
          }]}/>
      </Link>
    </td>
    <td className={styles.title}>
      <Link to={`${PRODUCT_ROUTE}/${item.slug}`}>{item.title}</Link>
    </td>
    <td className={styles.count}>
      <div>
        <span onClick={decreaseCart}>-</span>
        <span>{item.count}</span>
        <span onClick={increaseCart}>+</span>
      </div>
    </td>
    <td className={styles.price}>${item.price}</td>
    <td className={styles.total}>${item.subtotal}</td>
    <td className={styles.del}>
      <div onClick={removeFromCart}>+</div>
    </td>
  </tr>
);

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.item)),
  decreaseCart: () => dispatch(decreaseCart(props.item.slug)),
  removeFromCart: () => dispatch(removeFromCart(props.item.slug))
});

export default connect(null, mapDispatchToProps)(BasketItem);

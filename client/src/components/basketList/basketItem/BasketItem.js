import React from 'react';
import styles from "./BasketItem.module.css";
import {connect} from "react-redux";
import {
  increaseCart,
  decreaseCart,
  removeFromCart
} from "../../../redux/actions";

const BasketItem = ({item, increaseCart, decreaseCart, removeFromCart}) => (
  <tr key={item.id}>
    <td className={styles.picture}>
      <div>
        <img src={process.env.PUBLIC_URL + item.img[0]} alt=""/>
      </div>
    </td>
    <td className={styles.title}>
      {item.title}
    </td>
    <td className={styles.count}>
      <div>
        <span onClick={decreaseCart}>-</span>
        <span>{item.count}</span>
        <span onClick={increaseCart}>+</span>
      </div>
    </td>
    <td className={styles.price}>
      ${item.price}
    </td>
    <td className={styles.total}>
      ${item.subtotal}
    </td>
    <td className={styles.del}>
      <div onClick={removeFromCart}>+</div>
    </td>
  </tr>
);

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.item.id)),
  decreaseCart: () => dispatch(decreaseCart(props.item.id)),
  removeFromCart: () => dispatch(removeFromCart(props.item.id))
});

export default connect(null, mapDispatchToProps)(BasketItem);

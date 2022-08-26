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
import ErrorBoundary from "../../../ErrorBoundary";
import {orderSubtotalSelector} from "../../../../redux/selectors";

const BasketItem = ({item, increaseCart, decreaseCart, removeFromCart, subtotal}) => (
  <tr>
    <td className={styles.picture}>
      <Link to={`${PRODUCT_ROUTE}/${item.slug}`}>
        <ErrorBoundary>
          <IKImage
            lqip={{active: true}}
            urlEndpoint={images.urlEndpoint}
            path={item.images[0] || images.defaultImage}
            transformation={[{
              height: 88,
              width: 88
            }]}/>
        </ErrorBoundary>
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
    <td className={styles.priceWrap}>
      {
        !item.sale.discountPercent && <div className={styles.price}>${item.price}</div>
      }
      {
        !!item.sale.discountPercent &&
        <>
          <div className={styles.oldPrice}>${item.price}</div>
          <div className={styles.price}>${item.sale.price}</div>
        </>
      }
    </td>
    <td className={styles.total}>${subtotal}</td>
    <td className={styles.del}>
      <div onClick={removeFromCart}>+</div>
    </td>
  </tr>
);

const mapStateToProps = (state, props) => ({
  subtotal: orderSubtotalSelector(state, props)
});

const mapDispatchToProps = (dispatch, props) => ({
  increaseCart: () => dispatch(increaseCart(props.item)),
  decreaseCart: () => dispatch(decreaseCart(props.item.slug)),
  removeFromCart: () => dispatch(removeFromCart(props.item.slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);

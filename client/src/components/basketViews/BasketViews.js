import React from 'react';
import {activeBasketViewSelector} from "../../redux/selectors";
// import {BASKET_VIEWS} from "../utils/consts";
import {connect} from "react-redux";
import BasketList from "../basketList";
import BasketCheckout from "../basketCheckout";
import BasketCompleted from "../basketCompleted";


export const BasketViews = ({activeBasketView}) => {
  switch (activeBasketView) {
    case 'Shopping Cart':
      return <BasketList/>
    case 'Checkout':
      return <BasketCheckout/>
    case 'Completed':
      return <BasketCompleted/>
    default:
      return null;
  }
}

const mapStateToProps = (state, props) => ({
  activeBasketView: activeBasketViewSelector(state, props)
});

export default connect(mapStateToProps)(BasketViews);

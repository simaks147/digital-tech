import React from 'react';
import BasketList from "./basketList";
import BasketCheckout from "./basketCheckout";
import BasketCompleted from "./basketCompleted";
import {Redirect, Route, Switch} from "react-router-dom";
import {
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  BASKET_ROUTE_SHOPPING,
  LOGIN_ROUTE
} from "../../utils/consts";
import {tokenSelector} from "../../redux/selectors";
import {connect} from "react-redux";
import {PropTypes as Types} from "prop-types";

export const BasketViews = ({token}) => {
  if (!token) return <Redirect to={LOGIN_ROUTE}/>;

  return (
    <Switch>
      <Route path={BASKET_ROUTE_SHOPPING} component={BasketList}/>
      <Route path={BASKET_ROUTE_CHECKOUT} component={BasketCheckout}/>
      <Route path={BASKET_ROUTE_COMPLETED} component={BasketCompleted}/>
      <Redirect to={BASKET_ROUTE_SHOPPING}/>
    </Switch>
  );
}

BasketViews.propTypes = {
  token: Types.string
};

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props)
});

export default connect(mapStateToProps)(BasketViews);

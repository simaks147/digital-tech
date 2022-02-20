import React from 'react';
import BasketList from "./basketList";
import BasketCheckout from "./basketCheckout";
import BasketCompleted from "./basketCompleted";
import {Redirect, Route, Switch} from "react-router-dom";
import {
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  BASKET_ROUTE_SHOPPING
} from "../../utils/consts";


export const BasketViews = () => (
  <Switch>
    <Route path={BASKET_ROUTE_SHOPPING} component={BasketList}/>
    <Route path={BASKET_ROUTE_CHECKOUT} component={BasketCheckout}/>
    <Route path={BASKET_ROUTE_COMPLETED} component={BasketCompleted}/>
    <Redirect to={BASKET_ROUTE_SHOPPING}/>
  </Switch>
);

export default BasketViews;

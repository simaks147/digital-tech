import React, { FC } from 'react';
import BasketList from "./basketList";
import BasketCheckout from "./basketCheckout";
import BasketCompleted from "./basketCompleted";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  BASKET_ROUTE_CHECKOUT,
  BASKET_ROUTE_COMPLETED,
  BASKET_ROUTE_SHOPPING,
  LOGIN_ROUTE
} from "../../utils/consts";
import { tokenSelector } from "../../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { RootStateType } from '../../redux/store';

interface IProps extends PropsFromRedux { }

export const BasketViews: FC<IProps> = ({ token }) => {
  if (!token) return <Redirect to={LOGIN_ROUTE} />;

  return (
    <Switch>
      <Route path={BASKET_ROUTE_SHOPPING} component={BasketList} />
      <Route path={BASKET_ROUTE_CHECKOUT} component={BasketCheckout} />
      <Route path={BASKET_ROUTE_COMPLETED} component={BasketCompleted} />
      <Redirect to={BASKET_ROUTE_SHOPPING} />
    </Switch>
  );
}

const mapStateToProps = (state: RootStateType) => ({
  token: tokenSelector(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(BasketViews);

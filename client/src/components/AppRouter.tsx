import React, { ComponentType, FC } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { privateRoutes, adminRoutes, publicRoutes } from "../routes";
import { ERROR_ROUTE } from "../utils/consts";
import { dataProfileSelector, tokenSelector } from "../redux/selectors";
import { connect, ConnectedProps } from "react-redux";
import { getLocation } from "connected-react-router";
import { RootStateType } from '../redux/store';

interface IOwnProps { }

type IProps = IOwnProps & PropsFromRedux

const route = (path: string | string[], component: ComponentType<any>) => {
  const id = Array.isArray(path) ? path[0] : path
  return <Route key={id} path={path} component={component} exact />
}

const AppRouter: FC<IProps> = ({ dataProfile, token, location }) => (
  <Switch location={location}>

    {!!dataProfile.isAdmin && adminRoutes.map(({ path, Component }) => route(path, Component))}

    {!!token && privateRoutes.map(({ path, Component }) => route(path, Component))}

    {publicRoutes.map(({ path, Component }) => route(path, Component))}

    <Redirect to={ERROR_ROUTE} />

  </Switch>
);

const mapStateToProps = (state: RootStateType) => ({
  token: tokenSelector(state),
  dataProfile: dataProfileSelector(state),
  location: getLocation(state)
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AppRouter);

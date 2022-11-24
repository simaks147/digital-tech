import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, adminRoutes, publicRoutes} from "../routes";
import {ERROR_ROUTE} from "../utils/consts";
import {dataProfileSelector, tokenSelector} from "../redux/selectors";
import {connect} from "react-redux";
import {PropTypes as Types} from "prop-types";
import {getLocation} from "connected-react-router";

const AppRouter = ({dataProfile, token, location}) => (
  <Switch location={location}>
    {!!dataProfile.isAdmin && adminRoutes.map(({path, Component}) =>
      <Route key={path} path={path} component={Component} exact/>
    )}
    {!!token && privateRoutes.map(({path, Component}) =>
      <Route key={path} path={path} component={Component} exact/>
    )}
    {publicRoutes.map(({path, Component}) =>
      <Route key={path} path={path} component={Component} exact/>
    )}
    <Redirect to={ERROR_ROUTE}/>
  </Switch>
);

AppRouter.propTypes = {
  token: Types.string,
  dataProfile: Types.shape({
    isAdmin: Types.bool.isRequired
  }).isRequired
};

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props),
  dataProfile: dataProfileSelector(state),
  location: getLocation(state)
});

export default connect(mapStateToProps)(AppRouter);

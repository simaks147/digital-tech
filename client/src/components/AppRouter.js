import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, adminRoutes, publicRoutes} from "../routes";
import {ERROR_ROUTE} from "../utils/consts";
import {profileSelector, tokenSelector} from "../redux/selectors";
import {connect} from "react-redux";

const AppRouter = ({profile, token}) => {

  return (
    <Switch>
      {!!profile.isAdmin && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact />
      )}
      {!!token && privateRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact />
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact />
      )}
      <Redirect to={ERROR_ROUTE}/>
    </Switch>
  );
};

const mapStateToProps = (state, props) => ({
  token: tokenSelector(state, props),
  profile: profileSelector(state)
});

export default connect(mapStateToProps)(AppRouter);

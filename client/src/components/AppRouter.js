import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import routes from "../routes";
import {ERROR_ROUTE} from "../utils/consts";

const AppRouter = () => {

  return (
    <Switch>
      {routes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact />
      )}
      <Redirect to={ERROR_ROUTE}/>
    </Switch>
  );
};

export default AppRouter;

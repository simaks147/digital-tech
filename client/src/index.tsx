import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from "./components/app";
import store, { history } from "./redux/store";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter {...{ history }}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

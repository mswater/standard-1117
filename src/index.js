/* eslint-disable import/no-extraneous-dependencies */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer/index.js";

import "./lib/style/index.css";
import App from "./App.jsx";
import { getLogin } from "./service/api.js";

const env = process.env.NODE_ENV;

const initialState = window.__INITIAL__STATE__ || {};

const guestLogin = () => {
  console.log("guestLogin");
  // 游客账户登录
  const guestInfo = {
    "username": "guest",
    "password": "guest",
  };
  return () => {
    getLogin(guestInfo)
      .then((response) => {
        if (response.status === 200 && response.data.status === "OK") {
          console.log(response.data.data);
          localStorage.setItem("token", response.headers.token);
          localStorage.setItem("username", response.data.data.username);
          localStorage.setItem("realName", response.data.data.realname);
          localStorage.setItem("roleName", response.data.data.roleName);
        }
        if(response.data.status === "NG"){
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.dir(error);
      });
  };
};
guestLogin();

const store =
  env === "production"
    ? createStore(reducer, initialState, applyMiddleware(thunk))
    : createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

const root = document.getElementById("root");

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    root,
  );
};

render(App);

if (env === "development") {
  if (module.hot) {
    module.hot.accept("./App.jsx", () => {
      const NextApp = require("./App.jsx").default;
      render(NextApp);
    });
  }
}

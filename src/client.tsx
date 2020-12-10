import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./configureStore";
import "./scss/main.scss"; // keep this at top
import Router from "./router";
import { AUTH_USER } from "./actions/types";
import { getFromCookie } from "./credentials/access_credentials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = getFromCookie("Access-Token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <div className="main">
    <Provider store={store}>
      <Router />
    </Provider>
    <ToastContainer />
  </div>,
  document.getElementById("app")
);

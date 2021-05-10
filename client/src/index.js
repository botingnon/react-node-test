import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import Root from "./components/Root";
import * as serviceWorker from "./serviceWorker";

import { store } from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";

const root = document.getElementById("root");

render(
  <AppContainer>
    <Provider store={store}>
      <Root />
    </Provider>
  </AppContainer>,
  root
);

if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NewRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NewRoot />
        </Provider>
      </AppContainer>,
      root
    );
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

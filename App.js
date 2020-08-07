import React, { useState } from "react";
import { Provider, connect } from "react-redux";
import configureStore from "./redux/store";
import RootApp from "./components/RootApp";
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <RootApp />
    </Provider>
  );
}

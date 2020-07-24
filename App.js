import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import RootApp from "./components/RootApp";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const store = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <RootApp />
      </PaperProvider>
    </Provider>
  );
}

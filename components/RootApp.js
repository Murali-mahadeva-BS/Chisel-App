import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import BottomNavBar from "./BottomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import moment from "moment";
import {
  Appbar,
  DefaultTheme,
  withTheme,
  DarkTheme,
  Card,
} from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";

import { connect } from "react-redux";
import { getTheme } from "../redux/actions";

function RootApp({ themeColor, getTheme }) {
  const [defaultTheme, setDefaultTheme] = useState("");
  if (!themeColor && !defaultTheme) {
    setDefaultTheme("deepskyblue");
  }
  const theme = {
    ...DefaultTheme,
    dark: true,
    colors: {
      ...DefaultTheme.colors,

      primary: themeColor ? themeColor : defaultTheme,
      accent: "#f1c40f",
      secondary: "#3498db",
    },
  };
  useEffect(() => {
    getTheme();
  }, []);

  return (
    <PaperProvider theme={theme}>
      {defaultTheme ? (
        <Card style={styles.screen}>
          <Appbar.Header theme={withTheme}>
            <Appbar.Content
              title="Chisel"
              titleStyle={{ alignSelf: "center" }}
              subtitle={moment().format("MMM Do YYYY")}
              subtitleStyle={{ alignSelf: "center" }}
            />
          </Appbar.Header>
          <NavigationContainer>
            <BottomNavBar />
          </NavigationContainer>
          <StatusBar style="light" />
        </Card>
      ) : null}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "lightgrey",
  },
});

const mapStateToProps = (state) => {
  return {
    themeColor: state.taskReducer.themeColor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTheme: () => {
      dispatch(getTheme());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RootApp);

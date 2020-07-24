import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomNavBar from "./BottomNavBar";
import { NavigationContainer } from "@react-navigation/native";
import { Appbar, DefaultTheme, withTheme } from "react-native-paper";

export default function App() {
  return (
    <View style={styles.screen}>
      <Appbar.Header theme={withTheme}>
        <Appbar.Content
          title="Chisel"
          titleStyle={{ alignSelf: "center" }}
          theme="deepskyblue"
        />
      </Appbar.Header>
      <NavigationContainer>
        <BottomNavBar />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
});

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
function ThemeColor({ theme, handleThemeChange }) {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() => handleThemeChange(theme)}
    >
      <Card
        style={{
          ...styles.colorContainer,
          backgroundColor: theme,
        }}
      ></Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginHorizontal: 5,
  },
});
export default ThemeColor;

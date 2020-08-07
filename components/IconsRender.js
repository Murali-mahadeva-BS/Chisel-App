import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { IconsPath } from "../assets/Index";
import { useTheme, IconButton, Avatar } from "react-native-paper";

function IconsRender({ iconNumber, selectIcon, bckColor, iconSelected }) {
  if (iconNumber == iconSelected) {
    var backColor = "lightgray";
  } else {
    var backColor = bckColor;
  }
  return (
    <View style={{ ...styles.container, backgroundColor: backColor }}>
      <IconButton
        icon={IconsPath[iconNumber]}
        size={40}
        onPress={() => {
          // console.log("clickeds");
          selectIcon(iconNumber);
          // setBckColor("lightgray");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 60,
    height: 60,
    // resizeMode: "contain",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 8,
  },
});
export default IconsRender;

import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, IconButton, Colors, useTheme } from "react-native-paper";
import ThemeColor from "../components/ThemeColor";
import { connect } from "react-redux";
import { selectTheme } from "../redux/actions";

function Settings({ selectTheme }) {
  const [theme, setTheme] = useState([
    "#4ecdc4",
    "#ef476f",
    "#7b2cbf",
    "#f3722c",
    // "#8f2d56",
    "#ffca3a",
    "#5bba6f",
  ]);
  const handleThemeChange = (color) => {
    selectTheme(color);
  };
  return (
    <View style={styles.container}>
      <Card style={styles.themeContainer}>
        <Card.Title title="Select Theme " />
        <Card.Content>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {theme.map((color) => (
              <ThemeColor
                theme={color}
                key={color}
                handleThemeChange={handleThemeChange}
              />
            ))}
          </ScrollView>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeContainer: {
    margin: 10,
    elevation: 5,
    borderRadius: 10,
    height: 130,
  },
  colorContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    marginHorizontal: 5,
  },
});

// const mapStateToProps = (state) => {
//   return {
//     task: state.taskReducer.singletask,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    selectTheme: (color) => {
      dispatch(selectTheme(color));
    },
  };
};
export default connect(null, mapDispatchToProps)(Settings);

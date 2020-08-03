import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";

function DateButton({ dateCliked, date }) {
  return (
    <TouchableOpacity
      onPress={() => {
        dateCliked(date);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.date}>
        <Text style={{ fontSize: 22 }}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  date: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
    marginHorizontal: 3,
    backgroundColor: "whitesmoke",
  },
});

export default DateButton;

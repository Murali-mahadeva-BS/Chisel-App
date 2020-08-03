import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";

function YearButton({ yearClicked, year }) {
  return (
    <TouchableOpacity
      onPress={() => {
        yearClicked(year);
      }}
      activeOpacity={0.7}
    >
      <Card style={styles.buttonCard}>
        <Text style={{ fontSize: 18 }}>{year}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,

    borderRadius: 5,
    backgroundColor: "whitesmoke",
    marginVertical: 3,
  },
});

export default YearButton;

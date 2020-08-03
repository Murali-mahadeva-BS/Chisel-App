import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, Button } from "react-native-paper";

function MonthButton({ monthClicked, month }) {
  return (
    <TouchableOpacity
      onPress={() => {
        monthClicked(month);
      }}
      activeOpacity={0.7}
    >
      <Card style={styles.buttonCard}>
        <Text style={{ fontSize: 18 }}>{month}</Text>
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
    marginVertical: 2,
  },
});

export default MonthButton;

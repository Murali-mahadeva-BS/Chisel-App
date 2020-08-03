import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Avatar, Card, Text } from "react-native-paper";

function StatsTaskCard({ id, title, createdOn }) {
  return (
    <View style={styles.container}>
      <View key={id}>
        <Card style={styles.card}>
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <Avatar.Icon icon="folder" size={50} />
              <Text style={{ fontSize: 12 }}>skills here</Text>
            </View>

            <View style={styles.content}>
              <View
                style={{
                  justifyContent: "center",
                  padding: 5,
                }}
              >
                <Text style={{ fontSize: 17 }}>{title}</Text>
              </View>
              <View style={styles.timerContainer}>
                <Text style={{ marginLeft: 2, fontSize: 11 }}>{createdOn}</Text>
                <Avatar.Icon icon="timer" size={30} style={{ marginLeft: 5 }} />
                <Text style={{ marginLeft: 7 }}>clock details here</Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    flexDirection: "column",
    margin: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingLeft: 5,
  },
  card: {
    margin: 10,
    borderRadius: 10,
  },
  swipe: {
    backgroundColor: "red",
  },
  editButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: "lightgreen",
  },
});

export default StatsTaskCard;

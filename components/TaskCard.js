import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { deleteTask } from "../redux/actions";
import { Button, Avatar, Card } from "react-native-paper";

function TaskCard({ tasks, setData }) {
  return (
    <View style={{ flex: 1 }}>
      {tasks ? (
        tasks.map((item) => (
          <View key={item.id}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => setData(item.id)}
            >
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
                      <Text style={{ fontSize: 17 }}>{item.title}</Text>
                    </View>
                    <View style={styles.timerContainer}>
                      <Text
                        style={{
                          marginLeft: 2,
                          fontSize: 11,
                        }}
                      >
                        {item.createdOn}
                      </Text>
                      {/* <Avatar.Icon
                        icon="timer"
                        size={30}
                        style={{ marginLeft: 5 }}
                      />
                      <Text style={{ marginLeft: 7 }}>clock details here</Text> */}
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <View>
          <Text>NO tasks</Text>
        </View>
      )}
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
    marginHorizontal: 10,
    marginVertical: 7,
    borderRadius: 10,
    elevation: 3,
  },

  editButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    tasks: state.taskReducer.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (id) => {
      dispatch(deleteTask(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);

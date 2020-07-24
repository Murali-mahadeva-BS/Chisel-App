import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchTask, setTask } from "../redux/actions";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import moment from "moment";
function TestComp({ tasks, completedTasks, references, dates }) {
  // const currentDate = moment();
  // const startDate = moment(references.startDate, "MMM Do YYYY");
  // const diffDays = currentDate.diff(startDate, "days");
  // console.log(currentDate);
  // console.log(moment(currentDate).format("D MMMM YYYY"));
  return (
    <View>
      <Text>{JSON.stringify(references)}</Text>
      <Text>{JSON.stringify(dates)}</Text>
      {/* <Text>{currentDate}</Text> */}
      {/* <Text>{b.diff(a)}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    // flex: 1,
    backgroundColor: "lightpink",
  },
  main: {
    backgroundColor: "lightblue",
  },
});

const mapStateToProps = (state) => {
  return {
    references: state.taskReducer.references,
    tasks: state.taskReducer.tasks,
    completedTasks: state.taskReducer.completedTasks,
    dates: state.taskReducer.dates,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTask: () => {
      dispatch(fetchTask());
    },
    setTask: (id) => {
      dispatch(setTask(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestComp);

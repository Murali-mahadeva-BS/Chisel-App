import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";
import { connect } from "react-redux";
import TaskCard from "../components/TaskCard";
import { Button, Snackbar } from "react-native-paper";

import { undoTask } from "../redux/actions";

import TaskModal from "../components/TaskModal";

function Tasks({ undoTask }) {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);

  const setValues = (id) => {
    setId(id);
    showModal();
  };

  const [snackbarVisible, setSnackVisible] = useState(false);

  const toggleSnackbar = () => {
    console.log("toggle snackbar calld");
    setSnackVisible(!snackbarVisible);
  };

  const dismissSnackbar = () => setSnackVisible(false);

  const handleUndo = () => {
    console.log("handle undo clicked...");
    undoTask(id);
  };

  console.log("snackbar status " + JSON.stringify(snackbarVisible));
  return (
    <View style={styles.container}>
      <Modal visible={visible} onDismiss={hideModal} animationType="slide">
        <TaskModal
          id={id}
          hideModal={hideModal}
          toggleSnackbar={toggleSnackbar}
        />
      </Modal>

      <ScrollView>
        <TaskCard setData={setValues} />
      </ScrollView>
      {/* snackbar */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={dismissSnackbar}
        action={{
          label: "Undo",
          onPress: () => {
            console.log("undo clicked");
            handleUndo();
          },
        }}
      >
        Task completed! U can find this in completed tasks list in stats
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    task: state.taskReducer.singletask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    undoTask: (id) => {
      dispatch(undoTask(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);

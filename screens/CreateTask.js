import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import moment from "moment";

import { Card, Button, TextInput, HelperText } from "react-native-paper";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";

function CreateTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    Keyboard.dismiss();
    const date = moment().format("MMM Do YYYY");
    const task = { title, description, date };
    addTask(task);
    setTitle("");
    setDescription("");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View>
          <Card style={styles.card}>
            <Card.Content>
              <View>
                <TextInput
                  style={styles.titleInput}
                  label="Task"
                  mode="outlined"
                  value={title}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
              <View>
                <TextInput
                  style={styles.descriptionInput}
                  label="Description *Optional*"
                  mode="outlined"
                  multiline={true}
                  numberOfLines={5}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>
            </Card.Content>
            <Card.Actions>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button onPress={handleSubmit} disabled={title ? false : true}>
                  Done
                </Button>
              </View>
            </Card.Actions>
          </Card>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  titleInput: {
    marginVertical: 5,
  },
  desciptionInput: {
    marginVertical: 5,
  },
  card: {
    marginHorizontal: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    tasks: state.taskReducer.tasks,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch(addTask(task)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);

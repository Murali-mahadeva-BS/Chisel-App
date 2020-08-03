import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import moment from "moment";

import { Card, Button, TextInput, HelperText, Text } from "react-native-paper";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";

function CreateTask({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createCategory, setCreateCategory] = useState(false);

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
        {createCategory && (
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
                <View style={{ marginVertical: 10 }}>
                  {/* category selector */}
                  <Button mode="outlined">
                    you have no category create one
                  </Button>
                </View>
                <View>{/* icons selection and category maker */}</View>
              </Card.Content>
              <Card.Actions>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={handleSubmit}
                    disabled={title ? false : true}
                  >
                    Done
                  </Button>
                </View>
              </Card.Actions>
            </Card>
          </View>
        )}

        <Card style={styles.card}>
          <Card.Content>
            <View>
              <TextInput
                style={styles.titleInput}
                label="Category"
                mode="outlined"
                value={category}
                onChangeText={(text) => setCategory(text)}
              />
            </View>
          </Card.Content>
          <View style={styles.iconContainer}>
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
          </View>
          <Card.Actions>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Button>create</Button>
            </View>
          </Card.Actions>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleInput: {
    marginVertical: 5,
  },
  desciptionInput: {
    marginVertical: 5,
  },
  card: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 7,
    elevation: 5,
  },
  iconContainer: {
    // backgroundColor: "white",

    height: 150,
    borderColor: "lightgray",
    borderWidth: 1,
    margin: 10,
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

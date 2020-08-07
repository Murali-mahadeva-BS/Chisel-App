import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import moment from "moment";

import {
  Card,
  Button,
  TextInput,
  HelperText,
  Text,
  Avatar,
  useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";
import IconsRender from "../components/IconsRender";

function CreateTask({ addTask }) {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createCategory, setCreateCategory] = useState(false);
  const [iconSelected, setIconSelected] = useState("");

  const selectIcon = (iconNumber) => {
    setIconSelected(iconNumber);
  };
  const handleSubmit = () => {
    Keyboard.dismiss();
    const date = moment().format("MMM Do YYYY");

    const task = { title, description, date, category, iconSelected };
    addTask(task);
    setTitle("");
    setDescription("");
    setCategory("");
    setIconSelected("");
  };
  const iconNumbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
  ];
  console.log("iconselected" + iconSelected);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ScrollView>
          {!createCategory && (
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
                  <View>
                    <TextInput
                      style={styles.titleInput}
                      label="Category   eg, savings"
                      mode="outlined"
                      value={category}
                      onChangeText={(text) => setCategory(text)}
                    />
                  </View>
                  <View style={styles.iconContainer}>
                    <ScrollView
                      horizontal={true}
                      scrollEventThrottle={16}
                      showsHorizontalScrollIndicator={false}
                    >
                      {iconNumbers.map((num) => (
                        <IconsRender
                          iconNumber={num}
                          key={num}
                          selectIcon={selectIcon}
                          iconSelected={iconSelected}
                          bckColor={colors.primary}
                        />
                      ))}
                    </ScrollView>
                  </View>
                  {/* <View style={{ marginVertical: 10 }}>
                  <Button
                    mode="outlined"
                    onPress={() => setCreateCategory(true)}
                  >
                    you have no category create one
                  </Button>
                </View> */}
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
                      color={colors.secondary}
                    >
                      Done
                    </Button>
                  </View>
                </Card.Actions>
              </Card>
            </View>
          )}
          {/* {createCategory && (
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
                <IconsRender />
              </View>
              <Card.Actions>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Button onPress={() => setCreateCategory(false)}>
                    create
                  </Button>
                </View>
              </Card.Actions>
            </Card>
          )} */}
        </ScrollView>
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
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 7,
    paddingHorizontal: 5,
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

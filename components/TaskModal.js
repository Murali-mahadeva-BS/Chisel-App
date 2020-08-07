import {
  View,
  StyleSheet,
  Icon,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { IconsPath } from "../assets/Index";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchSingleTask, updateTask, strikeTask } from "../redux/actions";
import {
  Text,
  Button,
  Card,
  Avatar,
  IconButton,
  useTheme,
  TextInput,
  Colors,
} from "react-native-paper";

function TaskModal({
  hideModal,
  task,
  id,
  updateTask,
  fetchSingleTask,
  strikeTask,
  toggleSnackbar,
}) {
  const { colors } = useTheme();
  const [showUpdateCard, setShowUpdateCard] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [KeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    fetchSingleTask(id);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleUpdate = () => {
    setShowUpdateCard(false);
    const createdOn = task.createdOn;
    const newTask = { id, title, description, createdOn };
    updateTask(id, newTask);
  };

  const handleStrike = () => {
    console.log("strike task handle functions");
    strikeTask(id);
    hideModal();
    toggleSnackbar();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {task && (
          <View>
            <Card style={styles.card}>
              <View style={styles.cardContainer}>
                <View style={styles.iconContainer}>
                  <Avatar.Icon
                    icon={IconsPath[task.icon]}
                    size={50}
                    style={{ marginVertical: 5 }}
                  />
                  <Text style={{ fontSize: 12, marginVertical: 2 }}>
                    {task.category}
                  </Text>
                  <Text
                    style={{ marginLeft: 2, fontSize: 11, marginVertical: 2 }}
                  >
                    {task.createdOn}
                  </Text>
                </View>

                <View style={styles.content}>
                  <View style={styles.title}>
                    <Text style={{ fontSize: 19 }}>{task.title}</Text>
                  </View>
                </View>
              </View>
            </Card>
            {!showUpdateCard && (
              <View style={styles.taskUpdateButton}>
                <Card style={styles.updateCardButton}>
                  <Button
                    onPress={() => setShowUpdateCard(true)}
                    color={colors.secondary}
                  >
                    edit task
                  </Button>
                </Card>
                <Card style={styles.updateCardButton}>
                  <Button
                    onPress={() => handleStrike()}
                    color={colors.secondary}
                  >
                    strike task
                  </Button>
                </Card>
              </View>
            )}
            {/* update card section */}
            {showUpdateCard && (
              <View>
                <Card style={styles.updateCard}>
                  <TextInput
                    style={styles.titleInput}
                    label="Task"
                    mode="outlined"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                  />
                  <TextInput
                    style={styles.descriptionInput}
                    label="Description *Optional*"
                    mode="outlined"
                    multiline={true}
                    numberOfLines={5}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                  />
                </Card>

                <View style={styles.taskUpdateButton}>
                  <Card style={styles.updateCardButton}>
                    <Button
                      onPress={() => setShowUpdateCard(false)}
                      color={colors.secondary}
                    >
                      cancel
                    </Button>
                  </Card>
                  <Card style={styles.updateCardButton}>
                    <Button onPress={handleUpdate} color={colors.secondary}>
                      update task
                    </Button>
                  </Card>
                </View>
              </View>
            )}
          </View>
        )}
        {!KeyboardVisible && (
          <View style={styles.closeButtonContainer}>
            <IconButton
              icon="close"
              color={Colors.red500}
              size={50}
              onPress={() => hideModal()}
              style={styles.closeButton}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
    padding: 10,
  },
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
    paddingHorizontal: 5,
  },

  card: {
    borderRadius: 10,
  },
  closeButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 100,
  },
  closeButton: {
    borderWidth: 5,
    borderColor: "whitesmoke",
    backgroundColor: "lightpink",
  },
  title: {
    flex: 1,
    paddingVertical: 7,
  },
  taskUpdateButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 7,
  },
  updateCardButton: {
    borderRadius: 10,
    width: 170,
    alignSelf: "center",
  },
  updateCard: {
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    task: state.taskReducer.singletask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleTask: (id) => {
      dispatch(fetchSingleTask(id));
    },
    updateTask: (id, newTask) => {
      dispatch(updateTask(id, newTask));
    },
    strikeTask: (id) => {
      dispatch(strikeTask(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);

import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import { hide } from "expo/build/launch/SplashScreen";
function Statistics() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <View style={styles.modalButton}>
          <Button icon="calendar" onPress={showModal}>
            select date
          </Button>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onDismiss={hideModal}
          style={styles.modal}
        >
          <DatePicker hideModal={hideModal} />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  datePicker: {
    flex: 1,
    justifyContent: "flex-end",
    // alignSelf: "flex-end",
    // backgroundColor: "lightpink",
  },
  modalButton: {
    width: 200,
    justifyContent: "center",
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    marginVertical: 5,
  },
  modal: {
    // height: 300,
    backgroundColor: "lightgreen",
  },
});
export default Statistics;

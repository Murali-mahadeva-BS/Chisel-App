import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, IconButton, Colors, Button } from "react-native-paper";
function DatePicker({ hideModal }) {
  const [msgYear, setmsgYear] = useState(true);
  const [msgMonth, setmsgMonth] = useState(false);
  const [msgDate, setmsgDate] = useState(false);

  const yearClicked = () => {
    setmsgYear(false);
    setmsgMonth(true);
  };
  const monthClicked = () => {
    setmsgMonth(false);
    setmsgDate(true);
  };

  const dateCliked = () => {
    setmsgDate(false);
  };
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.container}>
        <View style={styles.selectedDate}>
          <View style={styles.dateText}>
            <Text>selected date</Text>
          </View>
          <Button icon="close" onPress={hideModal}></Button>
        </View>
        <View style={styles.dateButtonContainer}>
          <ScrollView
            horizontal={true}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              onPress={() => {
                dateCliked();
              }}
              activeOpacity={0.4}
            >
              <View style={styles.date}>
                <Text style={{ fontSize: 22 }}>25</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {/* year contaier */}
          <View style={styles.yearContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => {
                  yearClicked();
                }}
                activeOpacity={0.4}
              >
                <Card style={styles.buttonCard}>
                  <Text style={{ fontSize: 18 }}>2020</Text>
                </Card>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* month container */}
          <View style={styles.yearContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => {
                  monthClicked();
                }}
                activeOpacity={0.4}
              >
                <Card style={styles.buttonCard}>
                  <Text style={{ fontSize: 18 }}>july</Text>
                </Card>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
        <View style={styles.clickMessage}>
          {msgYear && <Text>click year</Text>}
          {msgMonth && <Text>click month</Text>}
          {msgDate && !msgMonth && !msgYear && <Text>click date</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: "honeydew",
    padding: 10,
  },
  date: {
    backgroundColor: "white",
    borderColor: "crimson",
    borderWidth: 2,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginHorizontal: 5,
    backgroundColor: "lightpink",
  },
  dateButtonContainer: {
    width: 350,
    marginHorizontal: 20,
    borderColor: "crimson",
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    backgroundColor: "honeydew",
  },
  yearContainer: {
    width: 150,
    height: 90,
    padding: 5,
    borderColor: "crimson",
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderColor: "crimson",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "lightpink",
  },
  clickMessage: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDate: {
    flexDirection: "row",
    // backgroundColor: "lightgreen",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secContainer: {
    // flex: 1,
    backgroundColor: "lightgreen",
  },
  dateText: {
    backgroundColor: "lightpink",
    borderRadius: 20,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
});
export default DatePicker;

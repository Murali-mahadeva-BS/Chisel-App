import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Dimensions, ScrollView } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import DatePicker from "../components/DatePicker";
import moment from "moment";
import { connect } from "react-redux";
import { getStats } from "../redux/actions";
import StatsTaskCard from "../components/StatsTaskCard";
import { PieChart } from "react-native-chart-kit";
function Statistics({
  getStats,
  completedTasksList,
  pendingTasksList,
  selectedDate,
}) {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [showTaskList, setShowTaskList] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);

  const showDatePicker = () => setVisible(true);

  const hideDatePicker = () => setVisible(false);
  useEffect(() => {
    let today = moment().format("MMM Do YYYY");
    getStats(today);
  }, []);

  // if (completedTasksList.length !== 0) {
  //   completedTasksNumber = completedTasksList.length;
  // }
  // if (pendingTasksList.length !== 0) {
  //   pendingTasksNumber = pendingTasksList.length;
  // }
  const completedTasksNumber = completedTasksList
    ? completedTasksList.length
    : 0;
  const pendingTasksNumber = pendingTasksList ? pendingTasksList.length : 0;

  if (moment().format("MMM Do YYYY") !== selectedDate && !showRefresh) {
    setShowRefresh(true);
  }
  if (moment().format("MMM Do YYYY") === selectedDate && showRefresh) {
    setShowRefresh(false);
  }

  const handleRefresh = () => {
    let today = moment().format("MMM Do YYYY");
    getStats(today);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card style={styles.perdayTasksStats}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 3,
              }}
            >
              <Text
                style={{
                  color: "deepskyblue",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Daily Tasks Progress
              </Text>
              {selectedDate && <Text>{selectedDate}</Text>}

              {showRefresh && (
                <Button
                  mode="outlined"
                  onPress={handleRefresh}
                  icon="backup-restore"
                  color={colors.secondary}
                >
                  refresh
                </Button>
              )}
              {!pendingTasksNumber && !completedTasksNumber && (
                <Text
                  style={{
                    color: "deepskyblue",
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  No Task Created Yet
                </Text>
              )}
            </View>
            <PieChart
              data={[
                {
                  name: "Completed",
                  number: completedTasksNumber,
                  color: "lightgreen",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Pending Task",
                  number: pendingTasksNumber,
                  color: "lightpink",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get("window").width - 16}
              height={220}
              chartConfig={{
                color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                // color: "white",
              }}
              accessor="number"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          </Card>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            {!showTaskList ? (
              <Button
                mode="outlined"
                onPress={() => setShowTaskList(true)}
                color={colors.secondary}
              >
                Show Tasks List
              </Button>
            ) : (
              <Button
                mode="outlined"
                onPress={() => setShowTaskList(false)}
                color={colors.secondary}
              >
                Close Tasks List
              </Button>
            )}
          </View>
          {showTaskList && (
            <View>
              <View style={styles.pendingTasksList}>
                {pendingTasksList ? (
                  <View>
                    <Text style={styles.noTaskMsg}>
                      {pendingTasksNumber} Pending Task
                    </Text>
                    {pendingTasksList.map((item) => (
                      <StatsTaskCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        createdOn={item.createdOn}
                        icon={item.icon}
                        category={item.category}
                      />
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noTaskMsg}>No Pending Tasks</Text>
                )}
              </View>
              <View style={styles.completedTasksList}>
                {completedTasksList ? (
                  <View>
                    <Text style={styles.noTaskMsg}>
                      {completedTasksNumber} completed Task
                    </Text>
                    {completedTasksList.map((item) => (
                      <StatsTaskCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        createdOn={item.createdOn}
                      />
                    ))}
                  </View>
                ) : (
                  <Text style={styles.noTaskMsg}>0 Task Completed</Text>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {visible && <DatePicker hideDatePicker={hideDatePicker} />}
      <View>
        {!visible && (
          <View style={styles.modalButton}>
            <Button
              icon="calendar"
              onPress={showDatePicker}
              color={colors.secondary}
            >
              select date
            </Button>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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

  perdayTasksStats: {
    margin: 10,
    elevation: 6,
    borderRadius: 10,
  },
  pendingTasksList: {
    backgroundColor: "lightpink",
  },
  completedTasksList: {
    backgroundColor: "lightgreen",
  },
  noTaskMsg: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    // color: "deepskyblue",
  },
});

const mapStateToProps = (state) => {
  return {
    completedTasksList: state.taskReducer.completedTasksList,
    pendingTasksList: state.taskReducer.pendingTasksList,
    selectedDate: state.taskReducer.selectedDate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStats: (date) => dispatch(getStats(date)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Statistics);

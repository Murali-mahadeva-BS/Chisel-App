import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Button, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import moment from "moment";
import DateButton from "./DateButton";
import YearButton from "./YearButton";
import MonthButton from "./MonthButton";
import { getStats } from "../redux/actions";

function DatePicker({ dates, getStats, hideDatePicker }) {
  const { colors } = useTheme();
  const [msgYear, setmsgYear] = useState(true);
  const [msgMonth, setmsgMonth] = useState(false);
  const [msgDate, setmsgDate] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  // const [finalDate, setFinalDate] = useState(null);
  const [datesList, setDatesList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [yearsList, setYearsList] = useState([]);

  const yearClicked = (pickedYear) => {
    // selectedYear = pickedYear;
    const tempArray = [];
    dates.map((item) => {
      let splitDate = item.split(" ");
      let month = splitDate[0];
      let year = splitDate[2];
      if (year == pickedYear && !tempArray.includes(month)) {
        tempArray.push(month);
      }
    });
    setMonthsList(tempArray);
    setmsgYear(false);
    setmsgMonth(true);
    setSelectedYear(pickedYear);
  };
  const monthClicked = (pickedMonth) => {
    console.log("month clicked");
    const tempArray = [];
    dates.map((item) => {
      let splitDate = item.split(" ");
      let year = splitDate[2];
      let month = splitDate[0];
      let date = splitDate[1].replace(/\D/g, "");

      if (year == selectedYear && month == pickedMonth) {
        tempArray.push(date);
      }
    });
    setDatesList(tempArray);
    setmsgMonth(false);
    setmsgDate(true);
    setSelectedMonth(pickedMonth);
  };

  const dateCliked = (pickedDate) => {
    setmsgDate(false);
    setSelectedDate(pickedDate);
    const getSuffix = (pickedDate) => {
      if (pickedDate > 3 && pickedDate < 21) return "th";
      switch (pickedDate % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const suffix = getSuffix(pickedDate);
    const finalDate = `${selectedMonth} ${pickedDate}${suffix} ${selectedYear}`;
    console.log("final date" + finalDate);
    getStats(finalDate);
    // setFinalDate(`${selectedMonth} ${selectedDate} ${selectedYear}`);
  };

  if (yearsList.length == 0) {
    const tempArray = [];
    dates.map((item) => {
      // get the list of years from dates
      let splitDate = item.split(" ");

      let year = splitDate[2];
      if (!tempArray.includes(year)) {
        tempArray.push(year);
      }
    });
    setYearsList(tempArray);
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectedDate}>
        <Text style={{ color: "whitesmoke" }}>Selected Date </Text>
        <View
          style={{
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          {selectedYear || selectedMonth || selectedDate ? (
            <View
              style={{ ...styles.dateText, backgroundColor: colors.primary }}
            >
              <Text>
                {selectedDate} {selectedMonth} {selectedYear}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Button
            icon="close"
            onPress={hideDatePicker}
            style={{ alignItems: "center", justifyContent: "center" }}
          ></Button>
        </View>
      </View>

      <View
        style={{ ...styles.dateButtonContainer, borderColor: colors.primary }}
      >
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {datesList &&
            datesList.map((date) => (
              <DateButton dateCliked={dateCliked} date={date} key={date} />
            ))}
        </ScrollView>
      </View>

      <View
        style={{
          marginVertical: 7,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* year container */}
        <View style={{ ...styles.yearContainer, borderColor: colors.primary }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {yearsList &&
              yearsList.map((year) => (
                <YearButton yearClicked={yearClicked} year={year} key={year} />
              ))}
          </ScrollView>
        </View>

        {/* month container */}
        <View style={{ ...styles.yearContainer, borderColor: colors.primary }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {monthsList &&
              monthsList.map((month) => (
                <MonthButton
                  monthClicked={monthClicked}
                  month={month}
                  key={month}
                />
              ))}
          </ScrollView>
        </View>
      </View>
      <View style={styles.clickMessage}>
        {msgYear && <Text style={{ color: "whitesmoke" }}>click year</Text>}
        {msgMonth && <Text style={{ color: "whitesmoke" }}>click month</Text>}
        {msgDate && !msgMonth && !msgYear && (
          <Text style={{ color: "whitesmoke" }}>click date</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    backgroundColor: "#323232",
    padding: 5,
  },

  dateButtonContainer: {
    minHeight: 62,
    marginHorizontal: 20,

    borderRadius: 50,
    padding: 5,
    borderWidth: 2,
  },
  yearContainer: {
    width: 150,
    height: 90,
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
  },

  clickMessage: {
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDate: {
    flexDirection: "row",
  },

  dateText: {
    borderRadius: 20,
    paddingHorizontal: 8,
  },
});

const mapStateToProps = (state) => {
  return {
    dates: state.taskReducer.dates,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStats: (finalDate) => dispatch(getStats(finalDate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);

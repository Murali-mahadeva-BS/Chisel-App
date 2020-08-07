import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tasks from "../screens/Tasks";
import CreateTask from "../screens/CreateTask";
import { useTheme } from "react-native-paper";
import TestComp from "./TestComp";
import { connect } from "react-redux";
import { initialLoadData, removeStorageData } from "../redux/actions";
import Statistics from "../screens/Statistics";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

function BottomNavBar({ initialLoadData, tasks, removeStorageData }) {
  const { colors } = useTheme();
  useEffect(() => {
    initialLoadData();
  }, []);

  // useEffect(() => {
  //   removeStorageData();
  // }, []);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: colors.primary,
      }}
    >
      {/* lists screen */}
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* create screen */}
      <Tab.Screen
        name="Create"
        component={CreateTask}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: "Statistics",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="poll-box" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="test"
        component={TestComp}
        options={{
          tabBarLabel: "test",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.taskReducer.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialLoadData: () => {
      dispatch(initialLoadData());
    },
    removeStorageData: () => {
      dispatch(removeStorageData());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BottomNavBar);

import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_SINGLE_TASK_SUCCESS,
  FETCH_SINGLE_TASK_FAILURE,
  INITIAL_LOAD_DATA_FAILURE,
  INITIAL_LOAD_DATA_SUCCESS,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  STRIKE_TASK_SUCCESS,
  STRIKE_TASK_FAILURE,
  UNDO_TASK_SUCCESS,
  UNDO_TASK_FAILURE,
  GET_STATS_SUCCESS,
} from "./taskTypes";
import { AsyncStorage } from "react-native";
import moment from "moment";

const state = {
  references: {
    refID: 0,
    startDate: null,
  },
  tasks: [],
  completedTasks: [],
  dates: [],
};
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
export const removeStorageData = () => async (dispatch) => {
  const tasksVal = JSON.stringify([]);
  const references = {
    refID: 0,
    startDate: null,
  };
  const referencesVal = JSON.stringify(references);
  const completedTasksVal = JSON.stringify([]);

  await AsyncStorage.multiSet([
    ["references", referencesVal],
    ["tasks", tasksVal],
    ["completedTasks", completedTasksVal],
  ])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("references in storefw" + referencesVal);
  console.log("storage cleared...");
};

// load data from async storage
export const initialLoadData = () => async (dispatch) => {
  console.log("initail data loading...");
  await AsyncStorage.multiGet(["references", "tasks", "completedTasks"])
    .then((val) => {
      const references = val[0][1];
      const tasks = val[1][1];
      const completedTasks = val[2][1];

      const parseReferences = JSON.parse(references);
      const parseTasks = JSON.parse(tasks);
      const parseCompletedTasks = JSON.parse(completedTasks);

      state.references = parseReferences;
      state.tasks = parseTasks;
      state.completedTasks = parseCompletedTasks;

      // const dates = []
      state.tasks.map((item) => {
        if (!state.dates.includes(item.createdOn)) {
          state.dates.push(item.createdOn);
        }
      });
      state.completedTasks.map((item) => {
        if (!state.dates.includes(item.createdOn)) {
          state.dates.push(item.createdOn);
        }
      });
      const dates = state.dates;
      const initData = {
        parseReferences,
        parseTasks,
        parseCompletedTasks,
        dates,
      };
      dispatch({
        type: INITIAL_LOAD_DATA_SUCCESS,
        payload: initData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addTask = ({ title, description, date }) => async (dispatch) => {
  console.log("in add task " + date);
  const id = state.references.refID + 1;
  state.references.refID = id;
  if (!state.references.startDate) {
    state.references.startDate = date;
  }

  if (!state.dates.includes(date)) {
    state.dates.push(date);
  }

  const finalTask = {
    id: id,
    title: title,
    description: description,
    createdOn: date,
  };
  state.tasks.push(finalTask);

  const completedTasksList = [];
  const pendingTasksList = [];
  state.tasks.map((item) => {
    if (item.createdOn == date) {
      pendingTasksList.push(item);
    }
  });
  state.completedTasks.map((item) => {
    if (item.createdOn == date) {
      completedTasksList.push(item);
    }
  });

  const data = {
    tasks: state.tasks,
    dates: state.dates,
    completedTasksList,
    pendingTasksList,
  };
  await AsyncStorage.setItem("tasks", JSON.stringify(state.tasks))
    .then((val) => {
      dispatch({
        type: ADD_TASK_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  await AsyncStorage.setItem("references", JSON.stringify(state.references))
    .then((val) => console.log("promise after setting id in storeage" + val))
    .catch((err) => console.log(err));
};

export const deleteTask = (id) => async (dispatch) => {
  const delIndex = state.tasks.findIndex((item) => item.id == id);
  state.tasks.splice(delIndex, 1);
  await AsyncStorage.setItem("tasks", JSON.stringify(state.tasks))
    .then((val) => {
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: state.tasks,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchSingleTask = (id) => (dispatch) => {
  console.log("in actions fethc single task");
  dispatch({
    type: FETCH_SINGLE_TASK_SUCCESS,
    payload: id,
  });
};

export const updateTask = (id, newTask) => async (dispatch) => {
  console.log("update task called...");
  const updateIndex = state.tasks.findIndex((item) => item.id == id);
  state.tasks.splice(updateIndex, 1, newTask);
  await AsyncStorage.setItem("tasks", JSON.stringify(state.tasks))
    .then((val) => {
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: state.tasks,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const strikeTask = (id) => async (dispatch) => {
  console.log("in actions strike task");
  const strikeIndex = state.tasks.findIndex((item) => item.id == id);
  const strikeTask = state.tasks[strikeIndex];

  state.completedTasks.push(strikeTask);

  // save task to completed task list
  await AsyncStorage.setItem(
    "completedTasks",
    JSON.stringify(state.completedTasks)
  )
    .then((val) => {
      console.log("srike task writted to local storage");
    })
    .catch((err) => {
      console.log(err);
    });
  // delete task from tasks list
  const delIndex = state.tasks.findIndex((item) => item.id == id);
  state.tasks.splice(delIndex, 1);
  const tasks = state.tasks;
  const completedTasks = state.completedTasks;

  state.completedTasks.map((item) => {
    if (!state.dates.includes(item.createdOn)) {
      state.dates.push(item.createdOn);
    }
  });
  const dates = state.dates;

  const completedTasksList = [];
  const pendingTasksList = [];
  state.tasks.map((item) => {
    if (item.createdOn == date) {
      pendingTasksList.push(item);
    }
  });
  state.completedTasks.map((item) => {
    if (item.createdOn == date) {
      completedTasksList.push(item);
    }
  });
  const data = {
    tasks,
    completedTasks,
    dates,
    completedTasksList,
    pendingTasksList,
  };
  await AsyncStorage.setItem("tasks", JSON.stringify(state.tasks))
    .then((val) => {
      dispatch({
        type: STRIKE_TASK_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const undoTask = (id) => async (dispatch) => {
  console.log("in actions undo task");
  const undoIndex = state.completedTasks.findIndex((item) => item.id == id);
  const undoTask = state.completedTasks[undoIndex];

  const insertIndex = state.tasks.findIndex((item) => item.id > id);

  const index = insertIndex < 0 ? state.tasks.length : insertIndex;
  state.tasks.splice(index, 0, undoTask);

  // save undo task back to task list
  await AsyncStorage.setItem("tasks", JSON.stringify(state.tasks))
    .then((val) => {
      console.log("undo task writted back to local storage");
    })
    .catch((err) => {
      console.log(err);
    });
  // delete task from completed tasks list
  const delIndex = state.completedTasks.findIndex((item) => item.id == id);
  state.completedTasks.splice(delIndex, 1);
  const tasks = state.tasks;
  const completedTasks = state.completedTasks;
  const data = { tasks, completedTasks };
  await AsyncStorage.setItem(
    "completedTasks",
    JSON.stringify(state.completedTasks)
  )
    .then((val) => {
      dispatch({
        type: UNDO_TASK_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStats = (date) => (dispatch) => {
  const completedTasksList = [];
  const pendingTasksList = [];
  state.tasks.map((item) => {
    if (item.createdOn == date) {
      pendingTasksList.push(item);
    }
  });
  state.completedTasks.map((item) => {
    if (item.createdOn == date) {
      completedTasksList.push(item);
    }
  });
  const data = { completedTasksList, pendingTasksList, date };
  return dispatch({
    type: GET_STATS_SUCCESS,
    payload: data,
  });
};

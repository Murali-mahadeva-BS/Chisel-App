import {
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  FETCH_SINGLE_TASK_SUCCESS,
  FETCH_SINGLE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  INITIAL_LOAD_DATA_SUCCESS,
  STRIKE_TASK_SUCCESS,
  UNDO_TASK_SUCCESS,
  GET_STATS_SUCCESS,
} from "./taskTypes";
const initialstate = {
  references: {},
  tasks: [],
  completedTasks: [],
  dates: [],
  completedTasksList: [],
  pendingTasksList: [],
};
const taskReducer = (state = initialstate, action) => {
  switch (action.type) {
    case INITIAL_LOAD_DATA_SUCCESS:
      state.references = action.payload.parseReferences;
      state.tasks = action.payload.parseTasks;
      state.completedTasks = action.payload.parseCompletedTasks;
      state.dates = action.payload.dates;
      return {
        ...state,
        tasks: [...action.payload.parseTasks],
      };

    case ADD_TASK_SUCCESS:
      state.tasks = action.payload.tasks;
      state.dates = action.payload.dates;
      state.completedTasksList = action.payload.completedTasksList;
      state.pendingTasksList = action.payload.pendingTasksList;

      return {
        ...state,
        tasks: [...action.payload.tasks],
        dates: [...action.payload.dates],
        completedTasksList: [...action.payload.completedTasksList],
        pendingTasksList: [...action.payload.pendingTasksList],
      };

    case DELETE_TASK_SUCCESS:
      state.tasks = action.payload;
      return {
        ...state,
        tasks: [...action.payload],
      };
    case FETCH_SINGLE_TASK_SUCCESS:
      const task = [...state.tasks];
      return {
        ...state,
        singletask: task.filter((item) => item.id === action.payload)[0],
      };
    case UPDATE_TASK_SUCCESS:
      state.tasks = action.payload;
      return {
        ...state,
        tasks: [...action.payload],
      };
    case STRIKE_TASK_SUCCESS:
      state.tasks = action.payload.tasks;
      state.completedTasks = action.payload.completedTasks;
      state.dates = action.payload.dates;
      state.completedTasksList = action.payload.completedTasksList;
      state.pendingTasksList = action.payload.pendingTasksList;

      return {
        ...state,
        tasks: [...action.payload.tasks],
        completedTasks: [...action.payload.completedTasks],
        dates: [...action.payload.dates],
        completedTasksList: [...action.payload.completedTasksList],
        pendingTasksList: [...action.payload.pendingTasksList],
      };
    case UNDO_TASK_SUCCESS:
      state.tasks = action.payload.tasks;
      state.completedTasks = action.payload.completedTasks;
      return {
        ...state,
        tasks: [...action.payload.tasks],
        completedTasks: [...action.payload.completedTasks],
      };
    case GET_STATS_SUCCESS:
      state.completedTasksList = action.payload.completedTasksList;
      state.pendingTasksList = action.payload.pendingTasksList;
      return {
        ...state,
        selectedDate: action.payload.date,
      };
    default:
      return state;
  }
};

export default taskReducer;

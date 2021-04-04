import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  isLoading: false,
  errors: [],
  tasks: [],
};

export const createTaskListDialogStateSlice = createSlice({
  name: "task-list",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.title = action.payload.title;
    },
    clearTitle: (state) => {
      state.title = initialState.title;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload.task)
    },
    removeTaskById: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id = action.payload.id)
    },
  },
});

export const createTaskListDialogStateActions = {
  ...createTaskListDialogStateSlice.actions,
};

const createTaskListDialogStateDomain = (state) =>
  state[createTaskListDialogStateSlice.name] || initialState;

const selectTitle = createSelector(
  createTaskListDialogStateDomain,
  (taskList) => taskList.title
);

const selectProcessing = createSelector(
  createTaskListDialogStateDomain,
  (taskList) => taskList.processing
);

const selectTasks = createSelector(
  createTaskListDialogStateDomain,
  (taskList) => taskList.tasks,
)

export const createTaskListStateDialogSelectors = {
  selectTitle,
  selectProcessing,
  selectTasks
};

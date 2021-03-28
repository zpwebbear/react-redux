import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  title: "",
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

export const createDialogTaskListStateSelectors = {
  selectTitle,
  selectProcessing,
};

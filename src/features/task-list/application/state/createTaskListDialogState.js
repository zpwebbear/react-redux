import { createSlice, createSelector, nanoid } from "@reduxjs/toolkit";

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
      state.tasks.push({ ...action.payload, id: nanoid(), completed: false });
    },
    removeTaskById: (state, action) => {
      state.tasks = state.tasks.filter((task) => (task.id = action.payload.id));
    },
    updateTaskById: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload,
      };
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
  (taskList) => taskList.tasks
);

const selectTaskIds = createSelector(selectTasks, (tasks) =>
  tasks.map((task) => task.id)
);

const selectTaskById = createSelector(
  selectTasks,
  (_, id) => id,
  (tasks, id) => {
    console.count(id)
    return tasks.find((task) => task.id === id);
  }
);

export const createTaskListStateDialogSelectors = {
  selectTitle,
  selectProcessing,
  selectTasks,
  selectTaskIds,
  selectTaskById,
};

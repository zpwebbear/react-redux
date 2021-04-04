import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useRegisterReducer } from "lib/redux/useRegisterReducer";
import { useSelectState } from "lib/redux/useSelectState";
import { useCallback } from "react";
import {
  createTaskListStateDialogSelectors,
  createTaskListDialogStateActions,
  createTaskListDialogStateSlice,
} from "../state/createTaskListDialogState";
import { useTaskListCloseCreateDialog } from "./useTaskListCloseCreateDialog";
import { useTaskListCreate } from "./useTaskListCreate";

export const useManageTaskListState = () => {
  useRegisterReducer(
    createTaskListDialogStateSlice.name,
    createTaskListDialogStateSlice.reducer
  );

  const { closeTaskListCreateDialog } = useTaskListCloseCreateDialog();

  const taskListTitle = useSelectState(
    createTaskListStateDialogSelectors.selectTitle
  );

  const taskListTasks = useSelectState(
    createTaskListStateDialogSelectors.selectTasks
  );

  // TODO: Add throttling here
  const updateTaskListTitleHandler = useDispatchAction(
    createTaskListDialogStateActions.updateTitle
  );

  const updateTaskListProcessing = useDispatchAction(
    createTaskListDialogStateActions.updateProcessing
  );

  const addTaskToTaskListHandler = useDispatchAction(
    createTaskListDialogStateActions.addTask
  );

  const { isLoading, mutateAsync } = useTaskListCreate({});

  const createTaskListHandler = useCallback(
    async (e) => {
      e.preventDefault();
      await mutateAsync({ title: taskListTitle });
      closeTaskListCreateDialog();
    },
    [closeTaskListCreateDialog, mutateAsync, taskListTitle]
  );

  return {
    taskListTasks,
    taskListTitle,
    taskListProcessing: isLoading,
    updateTaskListTitleHandler,
    updateTaskListProcessing,
    createTaskListHandler,
    addTaskToTaskListHandler,
  };
};

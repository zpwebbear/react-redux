import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useRegisterReducer } from "lib/redux/useRegisterReducer";
import { useSelectState } from "lib/redux/useSelectState";
import { useCallback } from "react";
import {
  createDialogTaskListStateSelectors,
  createTaskListDialogStateActions,
  createTaskListDialogStateSlice
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
    createDialogTaskListStateSelectors.selectTitle
  );

  // TODO: Add throttling here
  const updateTaskListTitleHandler = useDispatchAction(
    createTaskListDialogStateActions.updateTitle
  );

  const updateTaskListProcessing = useDispatchAction(
    createTaskListDialogStateActions.updateProcessing
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
    taskListTitle,
    taskListProcessing: isLoading,
    updateTaskListTitleHandler,
    updateTaskListProcessing,
    createTaskListHandler,
  };
};

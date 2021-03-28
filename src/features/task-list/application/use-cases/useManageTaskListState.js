import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useRegisterReducer } from "lib/redux/useRegisterReducer";
import { useSelectState } from "lib/redux/useSelectState";
import { useCallback } from "react";
import {
  createTaskListDialogStateActions,
  createDialogTaskListStateSelectors,
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
    createDialogTaskListStateSelectors.selectTitle
  );

  // TODO: Add throttling here
  const updateTaskListTitleHandler = useDispatchAction(
    createTaskListDialogStateActions.updateTitle
  );

  const updateTaskListProcessing = useDispatchAction(
    createTaskListDialogStateActions.updateProcessing
  );

  const { mutate, isLoading } = useTaskListCreate({
    onSuccessCallback: () => {
      closeTaskListCreateDialog();
    },
  });

  const createTaskListHandler = useCallback(
    (e) => {
      e.preventDefault();
      mutate({ title: taskListTitle });
    },
    [mutate, taskListTitle]
  );

  return {
    taskListTitle,
    taskListProcessing: isLoading,
    updateTaskListTitleHandler,
    updateTaskListProcessing,
    createTaskListHandler,
  };
};

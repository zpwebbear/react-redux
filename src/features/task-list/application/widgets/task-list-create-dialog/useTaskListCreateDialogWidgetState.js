import { useCase } from "app/use-case/use-case-container/UseCaseContainer";
import { useRegisterReducer } from "lib/redux/useRegisterReducer";
import { useCallback } from "react";
import { createTaskListDialogStateSlice } from "../../state/createTaskListDialogState";

export const useTaskListCreateDialogState = () => {
  useRegisterReducer(
    createTaskListDialogStateSlice.name,
    createTaskListDialogStateSlice.reducer
  );

  const { subscribe, dispatch } = useCase("taskListCreateDialog");

  const taskListTitle = subscribe("task-list/title");
  const taskListProcessing = subscribe("task-list/processing");

  const updateTaskListTitleHandler = useCallback(
    (taskList) =>
      dispatch({ type: "task-list/title-update", payload: taskList }),
    [dispatch]
  );
  const createTaskListHandler = useCallback(
    (e) => dispatch({ type: "task-list/create", payload: e }),
    [dispatch]
  );
  const closeTaskListCreateDialogHandler = useCallback(
    () => dispatch({ type: "task-list/close-create-dialog" }),
    [dispatch]
  );

  return {
    taskListTitle,
    taskListProcessing,
    createTaskListHandler,
    updateTaskListTitleHandler,
    closeTaskListCreateDialogHandler,
  };
};

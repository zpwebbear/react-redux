import { useProvider } from "app/provider-container/ProviderContainer";
import { eventTargetValueExtractor } from "lib/utils/eventTargetValueExtractor";
import { useCallback } from "react";

export const useTaskCreateItemState = ({ provider }) => {
  const { subscribe, dispatch } = useProvider(provider);

  const newTaskTitle = subscribe("taskTitle");
  const newTaskInputRef = subscribe("taskInputRef");
  const isLoading = subscribe("isLoading");

  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e?.preventDefault();
      dispatch({ type: "createNewTask", payload: { title: newTaskTitle } });
    },
    [dispatch, newTaskTitle]
  );

  const setNewTaskListTitleHandler = useCallback(
    (e) => {
      const payload = eventTargetValueExtractor(e);
      dispatch({ type: "updateTaskTitle", payload });
    },
    [dispatch]
  );

  return {
    newTaskTitle,
    setNewTaskListTitleHandler,
    taskCreateSubmitHandler,
    isLoading,
    newTaskInputRef,
  };
};

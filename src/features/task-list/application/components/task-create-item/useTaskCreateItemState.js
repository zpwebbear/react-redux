import { eventTargetValueExtractor } from "lib/utils/eventTargetValueExtractor";
import { useCallback, useRef, useState } from "react";
import { compose } from "redux";
import { useTaskListCreateTask } from "../../use-cases/useTaskListCreateTask";


export const useTaskCreateItemState = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const newTaskInputRef = useRef(null);

  const { mutate, isLoading } = useTaskListCreateTask({
    onSuccessCallback: () => {
      // setNewTaskTitle("");
    },
    onSettledCallback: () => {
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    },
  });
  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      mutate({ title: newTaskTitle });
    },
    [mutate, newTaskTitle]
  );

  const setNewTaskListTitleHandler = useCallback(
    (e) => compose(setNewTaskTitle, eventTargetValueExtractor)(e),
    []
  );

  return {
    newTaskTitle,
    setNewTaskListTitleHandler,
    taskCreateSubmitHandler,
    isLoading,
    newTaskInputRef,
  };
};

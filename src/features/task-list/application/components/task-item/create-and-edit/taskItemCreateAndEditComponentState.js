import { useCase } from "app/container/appContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const useTaskTitle = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const newTaskInputRef = useRef(null);

  const setNewTaskListTitleHandler = useCallback(
    (e) => {
      setNewTaskTitle(e.target.value);
    },
    [setNewTaskTitle]
  );

  return {
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    setNewTaskListTitleHandler,
  };
};

export const useTaskItemCreateAndEditOnTaskListPage = () => {
  const {
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    setNewTaskListTitleHandler,
  } = useTaskTitle();

  const { subscribe, dispatch, addEventListener } = useCase(
    "task/create/in-task-list"
  );

  const { id: taskListId } = useParams();

  const isLoading = subscribe("isLoading");

  useEffect(() => {
    addEventListener("onSuccess", () => {
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    });
  }, [addEventListener, newTaskInputRef, setNewTaskTitle]);

  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e?.preventDefault();
      if (newTaskTitle.trim().length === 0) {
        return;
      }
      dispatch({
        type: "task/create",
        payload: { task: { title: newTaskTitle }, taskListId },
      });
    },
    [dispatch, newTaskTitle, taskListId]
  );

  return {
    newTaskTitle,
    newTaskInputRef,
    isLoading,
    taskCreateSubmitHandler,
    setNewTaskListTitleHandler,
  };
};

export const useTaskItemCreateAndEditInTaskListCreateDialog = () => {
  const {
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    setNewTaskListTitleHandler,
  } = useTaskTitle();

  const { dispatch } = useCase("task/create/in-task-list-create-dialog");

  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e?.preventDefault();
      if (newTaskTitle.trim().length === 0) {
        return;
      }
      dispatch({ type: "addTask", payload: { title: newTaskTitle } });
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    },
    [dispatch, newTaskInputRef, newTaskTitle, setNewTaskTitle]
  );

  return {
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    setNewTaskListTitleHandler,
    taskCreateSubmitHandler,
  };
};

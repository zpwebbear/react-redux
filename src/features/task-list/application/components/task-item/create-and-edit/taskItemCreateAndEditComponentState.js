import { useAppCase, useAppQuery } from "app/container/appContainer";
import { useCallback, useEffect, useRef, useState } from "react";

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

  const { subscribe, dispatch, addEventListener } = useAppCase(
    "task/create/in-task-list"
  );

  const appRouterParams = useAppQuery("app/router/params", { token: "id" });
  const taskListId = appRouterParams.subscribe("id");

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

  const { dispatch } = useAppCase("task/create/in-task-list-create-dialog");

  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e?.preventDefault();
      if (newTaskTitle.trim().length === 0) {
        return;
      }
      dispatch({ type: "task/add", payload: { title: newTaskTitle } });
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

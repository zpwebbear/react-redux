import { createTaskListDialogStateActions } from "features/task-list/application/state/createTaskListDialogState";
import { useTaskListCreateTask } from "features/task-list/application/use-cases/useTaskListCreateTask";
import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useCallback, useRef, useState } from "react";

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

  const { mutate, isLoading } = useTaskListCreateTask({
    onSettledCallback: () => {
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    },
  });

  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e?.preventDefault();
      if (newTaskTitle.trim().length === 0) {
        return;
      }
      mutate({ task: { title: newTaskTitle } });
    },
    [mutate, newTaskTitle]
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

  const addTaskHandler = useDispatchAction(
    createTaskListDialogStateActions.addTask
  );

  const taskCreateSubmitHandler = useCallback(
    (e) => {
      e?.preventDefault();
      if (newTaskTitle.trim().length === 0) {
        return;
      }
      addTaskHandler({ title: newTaskTitle });
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    },
    [addTaskHandler, newTaskInputRef, newTaskTitle, setNewTaskTitle]
  );

  return {
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    setNewTaskListTitleHandler,
    taskCreateSubmitHandler,
  };
};

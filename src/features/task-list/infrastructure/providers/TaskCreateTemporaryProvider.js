import {
  createTaskListDialogStateActions
} from "features/task-list/state/createTaskListDialogState";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const useTaskCreateTemporaryProvider = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const newTaskInputRef = useRef(null);
  const stateDispatch = useDispatch();

  const createNewTask = useCallback(
    (payload) => {
      stateDispatch(createTaskListDialogStateActions.addTask(payload));
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    },
    [stateDispatch]
  );

  const subscribable = useMemo(
    () => ({
      taskTitle: newTaskTitle,
      taskInputRef: newTaskInputRef,
      isLoading: false,
    }),
    [newTaskTitle]
  );

  const dispatchable = useMemo(
    () => ({
      updateTaskTitle: setNewTaskTitle,
      createNewTask,
    }),
    [createNewTask]
  );

  const subscribe = useCallback(
    (token) => {
      return subscribable[token];
    },
    [subscribable]
  );

  const dispatch = useCallback(
    ({ type, payload }) => {
      dispatchable[type](payload);
    },
    [dispatchable]
  );

  return { subscribe, dispatch };
};

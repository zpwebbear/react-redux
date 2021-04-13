//@ts-check
import { useTaskListCreateTask } from "features/task-list/application/use-cases/useTaskListCreateTask";
import { useCallback, useMemo, useRef, useState } from "react";

export const useTaskCreateProvider = () => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const newTaskInputRef = useRef(null);
  const { mutate, isLoading } = useTaskListCreateTask({
    onSettledCallback: () => {
      setNewTaskTitle("");
      setTimeout(() => {
        newTaskInputRef.current?.focus();
      }, 0);
    },
  });

  const subscribable = useMemo(
    () => ({
      taskTitle: newTaskTitle,
      taskInputRef: newTaskInputRef,
      isLoading: isLoading,
    }),
    [isLoading, newTaskTitle],
  );

  const dispatchable = useMemo(
    () => ({
      updateTaskTitle: setNewTaskTitle,
      createNewTask: mutate,
    }),
    [mutate],
  );

  const subscribe = useCallback(
    (token) => {
      return subscribable[token];
    },
    [subscribable],
  );

  const dispatch = useCallback(
    ({ type, payload }) => {
      dispatchable[type](payload);
    },
    [dispatchable],
  );

  return { subscribe, dispatch };
};

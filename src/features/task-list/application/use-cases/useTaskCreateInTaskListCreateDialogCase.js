import { useCaseFactory } from "app/use-case/use-case-factory/useCaseFactory";
import { useCallback, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { createTaskListDialogStateActions } from "../state/createTaskListDialogState";

export const useTaskCreateInTaskListCreateDialogCase = () => {
  const events = useRef(new Map());
  const dispatch = useDispatch();

  const addTask = useCallback(
    (task) => {
      dispatch(createTaskListDialogStateActions.addTask(task));
    },
    [dispatch]
  );

  const subscribable = useMemo(() => new Map(), []);
  const dispatchable = useMemo(() => new Map([["addTask", addTask]]), [
    addTask,
  ]);

  return useCaseFactory({ dispatchable, subscribable, events });
};

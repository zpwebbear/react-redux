import { createHookEntity } from "app/container/utils/createHookEntity";
import { useCommandFactory } from "app/container/utils/useCommandFactory";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { createTaskListDialogStateActions } from "../state/createTaskListDialogState";

export const useTaskCreateInTaskListCreateDialogCommand = () => {
  const dispatch = useDispatch();

  const addTask = useCallback(
    (task) => {
      dispatch(createTaskListDialogStateActions.addTask(task));
    },
    [dispatch]
  );

  const dispatchable = useMemo(
    () => createHookEntity({ "task/add": addTask }),
    [addTask]
  );

  return useCommandFactory({ dispatchable });
};

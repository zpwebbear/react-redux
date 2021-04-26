import { useDialogContext } from "app/dialog/application/context/useDialogContext";
import { useCaseFactory } from "app/use-case/useCaseFactory";
import { useTaskCreate } from "features/task-list/infrastructure/repositories/TaskReactQueryRepository";
import {
  useTaskListTasks,
  useTaskListTitle,
  useUpdateTaskListTitle
} from "features/task-list/infrastructure/repositories/TaskReduxRepository";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTaskListCreate } from "./useTaskListCreate";

export const useTaskListCreateDialogCase = () => {
  const { dialogCloseHandler } = useDialogContext();

  const events = useRef(
    new Map([
      ["task-list-create/on-success", []],
      ["task-create/on-success", []],
    ])
  );

  const [taskListProcessing, setTaskListProcessing] = useState(false);

  const closeTaskListCreateDialog = useCallback(() => {
    dialogCloseHandler("task-list/create");
  }, [dialogCloseHandler]);

  const taskListTitle = useTaskListTitle();

  const taskListTasks = useTaskListTasks();

  const updateTaskListTitle = useUpdateTaskListTitle();

  const taskListCreate = useTaskListCreate({
    onSuccess: (...args) => {
      events.current
        .get("task-list-create/on-success")
        .forEach((cb) => cb(...args));
    },
  });

  const taskCreate = useTaskCreate({
    onSuccess: (...args) => {
      events.current.get("task-create/on-success").forEach((cb) => cb(...args));
    },
  });

  const createTaskList = useCallback(
    async (e) => {
      e?.preventDefault();
      setTaskListProcessing(true);
      const newTaskList = await taskListCreate.mutateAsync({
        title: taskListTitle,
      });

      const taskListMutations = taskListTasks.map((task) =>
        taskCreate.mutateAsync({ task, taskListId: newTaskList.id })
      );

      await Promise.all(taskListMutations);
      dialogCloseHandler("task-list/create");
      setTaskListProcessing(false);
    },
    [dialogCloseHandler, taskCreate, taskListCreate, taskListTasks, taskListTitle]
  );
  const subscribable = useMemo(
    () =>
      new Map([
        ["task-list/processing", taskListProcessing],
        ["task-list/title", taskListTitle],
      ]),
    [taskListProcessing, taskListTitle]
  );

  const dispatchable = useMemo(
    () =>
      new Map([
        ["task-list/close-create-dialog", closeTaskListCreateDialog],
        ["task-list/title-update", updateTaskListTitle],
        ["task-list/create", createTaskList],
      ]),
    [closeTaskListCreateDialog, createTaskList, updateTaskListTitle]
  );

  return useCaseFactory({ dispatchable, subscribable, events });
};

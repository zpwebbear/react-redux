import { useAppCommand, useAppQuery } from "app/container/appContainer";
import { useCallback } from "react";

export const useTaskItemOnTaskListPage = ({ id }) => {
  const taskItemQuery = useAppQuery("task/get/at-task-list-page", { id });
  const appRouterParamsQuery = useAppQuery("app/router/params", {
    token: "id",
  });
  const taskListId = appRouterParamsQuery.subscribe("id");
  const taskUpdateCommand = useAppCommand("task/update/task-list-page", {
    taskListId,
  });

  const taskItem = taskItemQuery.subscribe("task/item");
  const error = taskItemQuery.subscribe("task/error");
  const isFetched = taskItemQuery.subscribe("task/is-fetched");

  const onCheckHandler = useCallback(() => {
    taskUpdateCommand.dispatch({
      type: "task/update",
      payload: { id, body: { completed: !taskItem?.completed } },
    });
  }, [id, taskItem?.completed, taskUpdateCommand]);

  return { taskItem, error, isFetched, onCheckHandler };
};

export const useTaskItemInTaskListCreateDialog = ({ id }) => {
  const taskItemQuery = useAppQuery("task/get/at-task-create-dialog", { id });
  const taskItem = taskItemQuery.subscribe("task/item");

  const taskCommand = useAppCommand("task/update/at-task-list-create-dialog");

  const onCheckHandler = useCallback(
    () =>
      taskCommand.dispatch({
        type: "task/update",
        payload: { id, completed: !taskItem.completed },
      }),
    [id, taskCommand, taskItem.completed]
  );

  return { taskItem, error: false, isFetched: true, onCheckHandler };
};

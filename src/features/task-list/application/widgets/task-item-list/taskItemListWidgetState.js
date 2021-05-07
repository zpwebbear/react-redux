import { useAppQuery } from "app/container/appContainer";

export const useTaskItemListOnTaskListPage = (props) => {
  const appRouterParamsQuery = useAppQuery("app/router/params", {
    token: "id",
  });
  const taskListId = appRouterParamsQuery.subscribe("id");
  const { subscribe } = useAppQuery("task/ids/task-list-page", { taskListId });
  
  const taskIds = subscribe("task/ids");
  const error = subscribe("task/error");
  const isFetched = subscribe("task/is-fetched");

  return { ...props, taskIds, error, isFetched };
};

export const useTaskItemListInTaskListCreateDialog = (props) => {
  const { subscribe } = useAppQuery("task/ids/task-create-dialog");
  const taskIds = subscribe("task/ids");

  return { ...props, taskIds, error: false, isFetched: true };
};

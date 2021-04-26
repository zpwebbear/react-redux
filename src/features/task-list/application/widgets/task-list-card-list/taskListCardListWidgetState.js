import { useTaskListIdsQuery } from "../../queries/useTaskListIdsQuery";

export const useTaskListCardListOnTaskListViewPage = ({ children }) => {
  const { subscribe } = useTaskListIdsQuery();

  const taskListIds = subscribe("task-list/ids");
  const error = subscribe("task-list/error");
  const isFetched = subscribe("task-list/is-fetched");

  return {
    taskListIds,
    error,
    isFetched,
    children,
  };
};

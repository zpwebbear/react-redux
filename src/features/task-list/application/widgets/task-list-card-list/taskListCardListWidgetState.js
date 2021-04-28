import { useAppQuery } from "app/container/appContainer";

export const useTaskListCardListOnTaskListViewPage = ({ children }) => {
  const { subscribe } = useAppQuery("task-list/get/ids");

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

import { useTaskListGetAll } from "../../use-cases/useTaskListGetAll";

export const useTaskListCardListOnTaskListViewPage = ({ children }) => {
  const { data: taskLists, error, isFetched } = useTaskListGetAll({
    suspense: true,
    staleTime: Infinity
  });
  const taskListIds = taskLists.map((taskList) => taskList.id);

  return {
    taskListIds,
    error,
    isFetched,
    children,
  };
};

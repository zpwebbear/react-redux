import { useQuery } from "react-query";
import { useTaskListContext } from "../context/useTaskListContext";

export function useTaskListGetAll() {
  const { taskListRepository } = useTaskListContext();

  return useQuery({
    queryKey: ['task-list'],
    queryFn: () => {
      return taskListRepository.getAll();
    },
  });
}

import { useQuery, useQueryClient } from "react-query";
import { useTaskListContext } from "../context/useTaskListContext";

export function useTaskListGetAll() {
  const { taskListRepository } = useTaskListContext();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["task-list"],
    queryFn: () => {
      return taskListRepository.getAll();
    },
    onSuccess: (data) => {
      data.forEach((taskList) => {
        taskList.tasks?.forEach((task) => {
          queryClient.setQueryData(["task", task.id], task);
        });
      });
    },
  });
}

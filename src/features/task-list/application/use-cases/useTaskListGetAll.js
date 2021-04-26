import { useQuery, useQueryClient } from "react-query";
import { useTaskListContext } from "../context/useTaskListContext";

export function useTaskListGetAllOldCase(additionalOptions = {}) {
  const { taskListRepository } = useTaskListContext();
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["task-list"],
    queryFn: () => {
      return taskListRepository.getAll();
    },
    // onSuccess: (data) => {
    //   data.forEach((taskList) => {
    //     queryClient.setQueryData(["task-list", taskList.id], taskList);
    //     taskList.tasks?.forEach((task) => {
    //       queryClient.setQueryData(["task", task.id], task);
    //     });
    //   });
    // },
    ...additionalOptions,
  });
}

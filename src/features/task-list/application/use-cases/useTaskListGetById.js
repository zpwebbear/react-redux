import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";

export function useTaskListGetById(externalId, queryOptions = {}) {
  const { id } = useParams();
  const { taskListRepository } = useTaskListContext();
  const queryClient = useQueryClient();
  const queryKeyId = externalId ?? id;

  return useQuery({
    queryKey: ["task-list", queryKeyId],
    queryFn: () => taskListRepository.getById(queryKeyId),
    ...queryOptions,
    onSuccess: (data) => {
      const tasks = data.tasks;
      tasks?.forEach((task) => {
        queryClient.setQueryData(["task", task.id], task);
      });
    },
  });
}

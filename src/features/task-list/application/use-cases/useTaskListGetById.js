import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";

export function useTaskListGetById(externalId) {
  const { id } = useParams();
  const { taskListRepository } = useTaskListContext();

  const queryKeyId = externalId ?? id;

  return useQuery({
    queryKey: ["task-list", queryKeyId],
    queryFn: () => taskListRepository.getById(id),
  });
}

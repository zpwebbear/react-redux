import { useCreateSubscribable } from "app/container/utils/useCreateSubscribable";
import { useQueryFactory } from "app/container/utils/useQueryFactory";
import { useTaskIdsByTaskListId } from "features/task-list/infrastructure/repositories/TaskListReactQueryRepository";

export const useTaskIdsHttpQuery = ({ taskListId }) => {
  const { data: taskIds, error, isFetched } = useTaskIdsByTaskListId({
    queryKey: ["task-list", taskListId],
    queryFnParams: taskListId,
    queryOptions: { suspense: true },
  });

  const subscribable = useCreateSubscribable(
    {
      "task/ids": taskIds,
      "task/error": error,
      "task/is-fetched": isFetched,
    },
    [taskIds, error, isFetched]
  );

  return useQueryFactory({ subscribable });
};

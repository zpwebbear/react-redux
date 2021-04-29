import { useCreateSubscribable } from "app/container/utils/useCreateSubscribable";
import { useQueryFactory } from "app/container/utils/useQueryFactory";
import { useTaskGetById } from "features/task-list/infrastructure/repositories/TaskReactQueryRepository";

export const useTaskByIdForTaskListPageQuery = ({ id }) => {
  const { data: taskItem, error, isFetched } = useTaskGetById({
    queryKey: ["task", id],
    queryFnParams: id,
    queryOptions: { staleTime: Infinity, suspense: true },
  });

  const subscribable = useCreateSubscribable(
    {
      "task/item": taskItem,
      "task/error": error,
      "task/is-fetched": isFetched,
    },
    [taskItem, error, isFetched]
  );

  return useQueryFactory({ subscribable });
};

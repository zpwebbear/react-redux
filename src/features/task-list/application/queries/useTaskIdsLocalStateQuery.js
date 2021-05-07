import { useCreateSubscribable } from "app/container/utils/useCreateSubscribable";
import { useQueryFactory } from "app/container/utils/useQueryFactory";
import { useTaskIds } from "features/task-list/infrastructure/repositories/TaskReduxRepository";

export const useTaskIdsLocalStateQuery = () => {
  const taskIds = useTaskIds();

  const subscribable = useCreateSubscribable({ "task/ids": taskIds }, [
    taskIds,
  ]);

  return useQueryFactory({ subscribable });
};

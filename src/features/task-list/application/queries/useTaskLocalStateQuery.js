import { useCreateSubscribable } from "app/container/utils/useCreateSubscribable";
import { useQueryFactory } from "app/container/utils/useQueryFactory";
import { taskReduxRepository } from "features/task-list/infrastructure/repositories/TaskReduxRepository";

export const useTaskLocalStateQuery = ({id}) => {
  const task = taskReduxRepository.useTask(id);
  
  const subscribable = useCreateSubscribable({ "task/item": task }, [
    task,
  ]);

  return useQueryFactory({ subscribable });
};

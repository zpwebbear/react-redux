import { useCommandFactory } from "app/container/utils/useCommandFactory";
import { useCreateDispatchable } from "app/container/utils/useCreateDispatchable";
import { taskReduxRepository } from "features/task-list/infrastructure/repositories/TaskReduxRepository";

export const useTaskUpdateLocalStateCommand = () => {
  const updateTaskById = taskReduxRepository.useTaskUpdateById();
  
  const dispatchable = useCreateDispatchable(
    {
      "task/update": updateTaskById,
    },
    [taskReduxRepository.useTaskUpdateById]
  );

  return useCommandFactory({ dispatchable });
};

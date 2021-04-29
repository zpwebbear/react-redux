import { useCaseFactory } from "app/container/utils/useCaseFactory";
import { useCreateDispatchable } from "app/container/utils/useCreateDispatchable";
import { useCreateEvents } from "app/container/utils/useCreateEvents";
import { useCreateSubscribable } from "app/container/utils/useCreateSubscribable";
import { addTaskToTaskList } from "features/task-list/domain/addTaskToTaskList";
import { useTaskCreate } from "features/task-list/infrastructure/repositories/TaskReactQueryRepository";
import { useQueryClient } from "react-query";

export const useTaskCreateInTaskListCase = () => {
  const queryClient = useQueryClient();
  const events = useCreateEvents({ onSuccess: [] });

  const { mutate, isLoading } = useTaskCreate({
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["task-list", variables.taskListId]);
      const previousValue = queryClient.getQueryData([
        "task-list",
        variables.taskListId,
      ]);
      queryClient.setQueryData(
        ["task-list", variables.taskListId],
        (existedTaskList) => addTaskToTaskList(existedTaskList, variables.task)
      );

      return previousValue;
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(["task-list", variables.taskListId], context);
    },
    onSuccess: (data, variables, context) => {
      events.current
        .get("onSuccess")
        .forEach((cb) => cb(data, variables, context));
      queryClient.invalidateQueries(["task-list", variables.taskListId]);
    },
  });

  const subscribable = useCreateSubscribable({ isLoading: isLoading }, [
    isLoading,
  ]);

  const dispatchable = useCreateDispatchable({ "task/create": mutate }, [
    mutate,
  ]);
  return useCaseFactory({ dispatchable, subscribable, events });
};

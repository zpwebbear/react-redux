import { useCaseFactory } from "app/use-case/use-case-factory/useCaseFactory";
import { addTaskToTaskList } from "features/task-list/domain/addTaskToTaskList";
import { useTaskCreate } from "features/task-list/infrastructure/repositories/TaskReactQueryRepository";
import { useMemo, useRef } from "react";
import { useQueryClient } from "react-query";

export const useTaskCreateInTaskListCase = () => {
  const queryClient = useQueryClient();
  const events = useRef(new Map([["onSuccess", []]]));

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
    onSuccess: (...args) => {
      events.current.get("onSuccess").forEach((cb) => cb(...args));
    },
  });

  const subscribable = useMemo(() => new Map([["isLoading", isLoading]]), [
    isLoading,
  ]);
  const dispatchable = useMemo(() => new Map([["task/create", mutate]]), [
    mutate,
  ]);

  return useCaseFactory({ dispatchable, subscribable, events });
};

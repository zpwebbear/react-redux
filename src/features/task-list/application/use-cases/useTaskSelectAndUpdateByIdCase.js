import { useCaseFactory } from "app/container/utils/useCaseFactory";
import {
  useTaskUpdateById
} from "features/task-list/infrastructure/repositories/TaskReactQueryRepository";
import { useMemo, useRef } from "react";
import { useQueryClient } from "react-query";

export const useTaskSelectAndUpdateByIdCase = ({ id, taskListId }) => {
  const events = useRef(new Map([["onSuccess", []]]));
  const queryClient = useQueryClient();
  
  const updateTaskById = useTaskUpdateById({
    onMutate: async ({ id: taskId, body }) => {
      await queryClient.cancelQueries(["task", taskId]);
      const previousValue = queryClient.getQueryData(["task", taskId]);
      queryClient.setQueryData(["task", taskId], (old) => ({
        ...old,
        ...body,
      }));
      queryClient.setQueryData(["task-list", taskListId], (taskList) => {
        return {
          ...taskList,
          tasks: taskList.tasks.map((task) => {
            if (task.id !== taskId) {
              return task;
            }

            return {
              ...task,
              ...body,
            };
          }),
        };
      });

      return previousValue;
    },
    onError: (_, __, previousValue) => {
      queryClient.setQueryData(["task", previousValue.id], previousValue);
    },
    onSuccess: (updatedTask) => {
      setTimeout(() => {
        queryClient.invalidateQueries(["task", updatedTask.id]);
      }, 500);
    },
  });

  const dispatchable = useMemo(
    () => new Map([["task/update", updateTaskById.mutate]]),
    [updateTaskById.mutate]
  );

  return useCaseFactory({ dispatchable, events });
};

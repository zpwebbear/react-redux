import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";
import { addTaskToTaskList } from "features/task-list/domain/addTaskToTaskList";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";

export const useTaskListCreateTask = ({
  params = { taskListId: undefined, optimistic: true },
  onMutateCallback = () => {},
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
  onSettledCallback = () => {},
}) => {
  const { id } = useParams();
  const { taskRepository } = useTaskListContext();

  const queryKeyId = params.taskListId ?? id;
  const optimistic = params.optimistic;
  const queryClient = useQueryClient();

  return useMutation(
    ({ task, taskListId }) => {
      return taskRepository.createTaskInTaskList(
        taskListId || queryKeyId,
        task
      );
    },
    {
      onMutate: async (variables) => {
        onMutateCallback(variables);
        await queryClient.cancelQueries(["task", queryKeyId]);
        const previousValue = queryClient.getQueryData([
          "task-list",
          queryKeyId,
        ]);
        if (optimistic) {
          queryClient.setQueryData(
            ["task-list", queryKeyId],
            (existedTaskList) => {
              return addTaskToTaskList(existedTaskList, variables.task);
            }
          );
        }

        return previousValue;
      },
      onError: (error, variables, context) => {
        onErrorCallback(error, variables, context);
        queryClient.setQueryData(["task-list", queryKeyId], context);
      },
      onSuccess: (data, variables, context) => {
        onSuccessCallback(data, variables, context);
        setTimeout(() => {
          queryClient.invalidateQueries(["task-list", queryKeyId]);
        }, 500);
      },
      onSettled: (data, error, variables, context) => {
        onSettledCallback(data, error, variables, context);
      },
    }
  );
};

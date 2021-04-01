import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";
import { addTaskToTaskList } from "features/task-list/domain/addTaskToTaskList";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";

export const useTaskListCreateTask = ({
  params = { externalId: undefined },
  onMutateCallback = () => {},
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
  onSettledCallback = () => {},
}) => {
  const { id } = useParams();
  const { taskRepository } = useTaskListContext();

  const queryKeyId = params.externalId ?? id;
  const queryClient = useQueryClient();

  return useMutation(
    (newTask) => {
      return taskRepository.createTaskInTaskList(queryKeyId, newTask);
    },
    {
      onMutate: async (variables) => {
        onMutateCallback(variables);
        await queryClient.cancelQueries(["task", queryKeyId]);
        const previousValue = queryClient.getQueryData([
          "task-list",
          queryKeyId,
        ]);
        queryClient.setQueryData(["task-list", queryKeyId], (existedTaskList) =>
          addTaskToTaskList(existedTaskList, variables)
        );

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

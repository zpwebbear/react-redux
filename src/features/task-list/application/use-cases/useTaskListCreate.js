import { useMutation, useQueryClient } from "react-query";
import { useTaskListContext } from "../context/useTaskListContext";

export function useTaskListCreate({
  params = { externalId: undefined },
  onMutateCallback = () => {},
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
  onSettledCallback = () => {},
}) {
  const { taskListRepository } = useTaskListContext();
  const queryClient = useQueryClient();
  return useMutation(
    async (newTaskList) => {
      return taskListRepository.create(newTaskList);
    },
    {
      onMutate: (variables) => {
        onMutateCallback(variables);
      },
      onError: (err, variables, context) => {
        onErrorCallback(err, variables, context);
      },
      onSuccess: (data, variables, context) => {
        onSuccessCallback(data, variables, context);
        queryClient.setQueryData(["task-list"], (oldTaskLists) => [
          ...oldTaskLists,
          data,
        ]);
      },
      onSettled: (data, error , variables, context) => {
        onSettledCallback(data, error, variables, context);
      }
    }
  );
}

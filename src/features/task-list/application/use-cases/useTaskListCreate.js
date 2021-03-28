import { useMutation, useQueryClient } from "react-query";
import { useTaskListContext } from "../context/useTaskListContext";

export function useTaskListCreate({
  onMutateCallback = () => {},
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
}) {
  const { taskListRepository } = useTaskListContext();
  const queryClient = useQueryClient();
  return useMutation(
    async (newTaskList) => {
      return taskListRepository.create(newTaskList);
    },
    {
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
    }
  );
}

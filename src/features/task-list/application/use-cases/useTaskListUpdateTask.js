import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { updateTaskInTaskList } from "features/task-list/domain/updateTaskInTaskList";
import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";

export function useTaskListUpdateTask(externalId) {
  const { id } = useParams();
  const { taskRepository } = useTaskListContext();

  const queryKeyId = externalId ?? id;
  const queryClient = useQueryClient();

  return useMutation(
    (updatedTodo) => {
      return taskRepository.replace(updatedTodo.id, updatedTodo);
    },
    {
      onMutate: async (todo) => {
        await queryClient.cancelQueries(["task", queryKeyId]);
        const previousValue = queryClient.getQueryData([
          "task-list",
          queryKeyId,
        ]);
        queryClient.setQueryData(["task-list", queryKeyId], (old) =>
          updateTaskInTaskList(old, todo)
        );

        return previousValue;
      },

      onError: (err, previousValue) => {
        console.error(err);
        queryClient.setQueryData(["task", queryKeyId], previousValue);
      },
      
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries(["task", queryKeyId]);
        }, 500);
      },
    }
  );
}

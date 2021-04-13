import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";

export function useTaskListUpdateTaskById(taskListId) {
  const { id } = useParams();
  const { taskRepository } = useTaskListContext();

  const queryKeyId = taskListId ?? id;
  const queryClient = useQueryClient();

  return useMutation(
    ({ id: taskId, updated }) => {
      return taskRepository.replace(taskId, updated);
    },
    {
      onMutate: async ({ id: taskId, updated }) => {
        await queryClient.cancelQueries(["task", queryKeyId]);
        const previousValue = queryClient.getQueryData([
          "task-list",
          queryKeyId,
        ]);
        queryClient.setQueryData(["task", taskId], (old) => ({
          ...old,
          ...updated,
        }));

        return previousValue;
      },

      onError: (err, previousValue) => {
        console.error(err);
        queryClient.setQueryData(["task", previousValue.id], previousValue);
      },

      onSuccess: (updatedTask) => {
        setTimeout(() => {
          queryClient.invalidateQueries(["task", updatedTask.id]);
        }, 500);
      },
    }
  );
}

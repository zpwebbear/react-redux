import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { updateTaskInTaskList } from "../domain/updateTaskInTaskList";

export function useTaskListService({ taskListAPI, taskAPI }) {
  const queryKeyIdentifier = "task-lists";

  const queryKeyValuesMap = {
    getAll: () => [queryKeyIdentifier],
    getById: (id) => [queryKeyIdentifier, id],
  };

  const getQueryKey = (key, id) => {
    return queryKeyValuesMap[key](id).filter(Boolean);
  };

  return {
    useTaskListGetAll() {
      return useQuery({
        queryKey: getQueryKey("getAll"),
        queryFn: () => {
          return taskListAPI.getAll();
        },
      });
    },
    
    useTaskListGetById: (externalId) => {
      const { id } = useParams();

      const queryKeyId = externalId ?? id;

      return useQuery({
        queryKey: getQueryKey("getById", queryKeyId),
        queryFn: () => taskListAPI.getById(id),
      });
    },

    useTaskListUpdateTask: (externalId) => {
      const { id } = useParams();

      const queryKeyId = externalId ?? id;
      const queryClient = useQueryClient();

      return useMutation(
        (updatedTodo) => taskAPI.replace(updatedTodo.id, updatedTodo),
        {
          onMutate: async (todo) => {
            await queryClient.cancelQueries(getQueryKey("getById", queryKeyId));
            const previousValue = queryClient.getQueryData([
              "task-list",
              queryKeyId,
            ]);
            queryClient.setQueryData(
              getQueryKey("getById", queryKeyId),
              (old) => updateTaskInTaskList(old, todo)
            );

            return previousValue;
          },
          // On failure, roll back to the previous value
          onError: (err, previousValue) => {
            console.error(err);
            queryClient.setQueryData(
              getQueryKey("getById", queryKeyId),
              previousValue
            );
          },
          // After success or failure, refetch the todos query
          onSuccess: () => {
            // Set timeout is needed here to wait the server process the data
            setTimeout(() => {
              queryClient.invalidateQueries(getQueryKey("getById", queryKeyId));
            }, 500);
          },
        }
      );
    },

    useTaskListCreate: () => {
      return ;
    }
  };
}

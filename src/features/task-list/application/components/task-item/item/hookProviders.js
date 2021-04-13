import { useTaskListContext } from "features/task-list/application/context/useTaskListContext";
import {
  createTaskListDialogStateActions,
  createTaskListStateDialogSelectors,
} from "features/task-list/application/state/createTaskListDialogState";
import { useTaskListUpdateTaskById } from "features/task-list/application/use-cases/useTaskListUpdateTaskById";
import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useSelectState } from "lib/redux/useSelectState";
import { useCallback } from "react";
import { useQuery } from "react-query";

export const useTaskItemOnTaskListPage = ({ id }) => {
  const { taskRepository } = useTaskListContext();

  const { data: taskItem, error, isFetched } = useQuery({
    queryKey: ["task", id],
    queryFn: () => taskRepository.getById(id),
    staleTime: Infinity,
    suspense: true,
  });
  const { mutate } = useTaskListUpdateTaskById();
  const onCheckHandler = useCallback(() => {
    mutate({ id, updated: { completed: !taskItem?.completed } });
  }, [id, mutate, taskItem?.completed]);

  return { taskItem, error, isFetched, onCheckHandler };
};

export const useTaskItemInTaskListCreateDialog = ({ id }) => {
  const taskItem = useSelectState(
    createTaskListStateDialogSelectors.selectTaskById,
    id
  );

  const onCheckHandler = useDispatchAction(() =>
    createTaskListDialogStateActions.updateTaskById({
      id,
      completed: !taskItem.completed,
    })
  );

  return { taskItem, error: false, isFetched: true, onCheckHandler };
};

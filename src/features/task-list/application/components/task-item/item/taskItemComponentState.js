import { useAppCase, useAppQuery } from "app/container/appContainer";
import {
  createTaskListDialogStateActions,
  createTaskListStateDialogSelectors,
} from "features/task-list/application/state/createTaskListDialogState";
import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useSelectState } from "lib/redux/useSelectState";
import { useCallback } from "react";
import { useParams } from "react-router";

export const useTaskItemOnTaskListPage = ({ id }) => {
  const { id: taskListId } = useParams();
  const { dispatch } = useAppCase("task/select-and-update/api", {
    id,
    taskListId,
  });

  const taskItemQuery = useAppQuery("task/get/title", { id });

  const taskItem = taskItemQuery.subscribe("task/item");
  const error = taskItemQuery.subscribe("task/error");
  const isFetched = taskItemQuery.subscribe("task/is-fetched");

  const onCheckHandler = useCallback(() => {
    dispatch({
      type: "task/update",
      payload: { id, body: { completed: !taskItem?.completed } },
    });
  }, [dispatch, id, taskItem?.completed]);

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

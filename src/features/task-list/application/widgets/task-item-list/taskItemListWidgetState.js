import { createTaskListStateDialogSelectors } from "features/task-list/application/state/createTaskListDialogState";
import { useTaskListGetById } from "features/task-list/application/use-cases/useTaskListGetById";
import { useSelectState } from "lib/redux/useSelectState";

export const useTaskItemListOnTaskListPage = (props) => {
  const { data: taskList, error, isFetched } = useTaskListGetById(null, {
    suspense: true,
  });

  const taskIds = taskList.tasks.map((task) => task.id);
  return { ...props, taskIds, error, isFetched };
};

export const useTaskItemListInTaskListCreateDialog = (props) => {
  const taskIds = useSelectState(
    createTaskListStateDialogSelectors.selectTaskIds,
    (prev, next) => prev.length === next.length
  );

  return { ...props, taskIds, error: false, isFetched: true };
};

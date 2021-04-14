import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useRegisterReducer } from "lib/redux/useRegisterReducer";
import { useSelectState } from "lib/redux/useSelectState";
import { useCallback, useState } from "react";
import {
  createTaskListDialogStateActions,
  createTaskListDialogStateSlice,
  createTaskListStateDialogSelectors,
} from "../../state/createTaskListDialogState";
import { useTaskListCloseCreateDialog } from "../../use-cases/useTaskListCloseCreateDialog";
import { useTaskListCreate } from "../../use-cases/useTaskListCreate";
import { useTaskListCreateTask } from "../../use-cases/useTaskListCreateTask";

export const useTaskListCreateDialogState = () => {
  useRegisterReducer(
    createTaskListDialogStateSlice.name,
    createTaskListDialogStateSlice.reducer
  );

  const [taskListProcessing, setTaskListProcessing] = useState(false);

  const { closeTaskListCreateDialog } = useTaskListCloseCreateDialog();

  const taskListTitle = useSelectState(
    createTaskListStateDialogSelectors.selectTitle
  );

  const taskListTasks = useSelectState(
    createTaskListStateDialogSelectors.selectTasks
  );

  // TODO: Add throttling here
  const updateTaskListTitleHandler = useDispatchAction(
    createTaskListDialogStateActions.updateTitle
  );

  const { mutateAsync } = useTaskListCreate({});

  const taskListMutation = useTaskListCreateTask({
    params: { optimistic: false },
  });

  const createTaskListHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setTaskListProcessing(true);
      const newTaskList = await mutateAsync({ title: taskListTitle });

      const taskListMutations = taskListTasks.map((task) =>
        taskListMutation.mutateAsync({ task, taskListId: newTaskList.id })
      );

      await Promise.all(taskListMutations);
      closeTaskListCreateDialog();
      setTaskListProcessing(false);
    },
    [
      closeTaskListCreateDialog,
      mutateAsync,
      taskListMutation,
      taskListTasks,
      taskListTitle,
    ]
  );

  return {
    taskListTitle,
    taskListProcessing,
    createTaskListHandler,
    updateTaskListTitleHandler,
    closeTaskListCreateDialog,
  };
};

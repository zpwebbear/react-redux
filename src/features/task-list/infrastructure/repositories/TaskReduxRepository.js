import {
  createTaskListDialogStateActions,
  createTaskListStateDialogSelectors,
} from "features/task-list/application/state/createTaskListDialogState";
import { useDispatchAction } from "lib/redux/useDispatchAction";
import { useDispatch, useSelector } from "react-redux";

export const useAddTask = () =>
  useDispatchAction(createTaskListDialogStateActions.addTask);

export const useTaskListTitle = () =>
  useSelector(createTaskListStateDialogSelectors.selectTitle);

export const useTaskListTasks = () =>
  useSelector(createTaskListStateDialogSelectors.selectTasks);

export const useUpdateTaskListTitle = () => {
  const dispatch = useDispatch();

  return (...args) =>
    dispatch(createTaskListDialogStateActions.updateTitle(...args));
};

export const useTaskIds = () =>
  useSelector(
    createTaskListStateDialogSelectors.selectTaskIds,
    (prev, next) => prev.length === next.length
  );

export const useTask = (id) =>
  useSelector((state) =>
    createTaskListStateDialogSelectors.selectTaskById(state, id)
  );

const useTaskUpdateById = () => {
  const dispatch = useDispatch();

  return (task) =>
    dispatch(createTaskListDialogStateActions.updateTaskById(task));
};

export const taskReduxRepository = {
  useAddTask,
  useTaskListTitle,
  useUpdateTaskListTitle,
  useTaskIds,
  useTask,
  useTaskUpdateById,
};

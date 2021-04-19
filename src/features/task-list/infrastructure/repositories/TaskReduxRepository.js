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

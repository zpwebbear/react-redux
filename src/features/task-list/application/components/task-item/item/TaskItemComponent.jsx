import { componentStateHookFactory } from "app/component-state/componentStateHookFactory";
import PropTypes from "prop-types";
import { memo } from "react";
import {
  useTaskItemInTaskListCreateDialog,
  useTaskItemOnTaskListPage
} from "./taskItemComponentState";

const hooks  = {
  taskListPage: useTaskItemOnTaskListPage,
  taskListCreateDialog: useTaskItemInTaskListCreateDialog,
};

const useTaskItemComponentState = componentStateHookFactory(hooks, [
  "taskListPage",
  "taskListCreateDialog"
]);

export const TaskItemComponent = memo((props) => {
  const { taskItem, error, isFetched, onCheckHandler } = useTaskItemComponentState(
    props
  );

  if (error) {
    return error.message;
  }

  return (
    <li className="py-1">
      {isFetched && (
        <label className="cursor-pointer hover:text-purple-700">
          <input
            type="checkbox"
            data-testid="task-item-checkbox"
            checked={taskItem.completed}
            onChange={onCheckHandler}
          />
          <span className="px-5">{taskItem.title}</span>
        </label>
      )}
    </li>
  );
});

TaskItemComponent.displayName = "TaskItemComponent"

TaskItemComponent.propTypes = {
  id: PropTypes.number,
  provider: PropTypes.oneOf(["default", "taskListCreateDialog"]),
};

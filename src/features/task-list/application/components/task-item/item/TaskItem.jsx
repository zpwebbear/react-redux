import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
  useTaskItemInTaskListCreateDialog,
  useTaskItemOnTaskListPage,
} from "./hookProviders";

const providers = {
  default: useTaskItemOnTaskListPage,
  taskListCreateDialog: useTaskItemInTaskListCreateDialog,
};

const useTaskItemState = ({ provider = "default", ...rest }) => {
  const useProviderHook = useMemo(() => providers[provider], [provider]);

  return useProviderHook(rest);
};

export const TaskItem = memo((props) => {
  const { taskItem, error, isFetched, onCheckHandler } = useTaskItemState(
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

TaskItem.propTypes = {
  id: PropTypes.number,
  provider: PropTypes.oneOf(["default", "taskListCreateDialog"]),
};

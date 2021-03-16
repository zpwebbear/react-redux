import PropTypes from "prop-types";

export const TaskItem = ({ taskItem, onCheckHandler }) => {
  return (
    <li className="py-1">
      <label className="cursor-pointer hover:text-purple-700">
        <input
          type="checkbox"
          data-testid="task-item-checkbox"
          checked={taskItem.completed}
          onChange={onCheckHandler}
        />
        <span className="px-5">{taskItem.title}</span>
      </label>
    </li>
  );
};

TaskItem.propTypes = {
  taskItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }),
  onCheckHandler: PropTypes.func,
};

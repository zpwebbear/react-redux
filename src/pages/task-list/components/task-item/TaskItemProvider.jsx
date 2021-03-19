import { useTaskListUpdateTask } from "features/task-list/application/use-cases/useTaskListUpdateTask";
import PropTypes from "prop-types";
import { TaskItem } from "./TaskItem";

export const TaskItemProvider = ({ task }) => {

  const { mutate } = useTaskListUpdateTask();

  return (
    <TaskItem
      taskItem={task}
      onCheckHandler={() => {
        mutate({ ...task, completed: !task.completed });
      }}
    />
  );
};

TaskItemProvider.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};

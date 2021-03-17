import { useTaskListService } from "features/task-list/application/useTaskListService";
import { taskListRepository } from "features/task-list/infrastructure/repositories/TaskListRepository";
import { taskRepository } from "features/task-list/infrastructure/repositories/TaskRepository";
import { TaskItem } from "./TaskItem";
import PropTypes from "prop-types";

export const TaskItemProvider = ({ task }) => {
  const { useTaskListUpdateTask } = useTaskListService({
    taskListAPI: taskListRepository,
    taskAPI: taskRepository,
  });
  const { mutate } = useTaskListUpdateTask();
  
  return (
    <TaskItem
      taskItem={task}
      onCheckHandler={() => mutate({ ...task, completed: !task.completed })}
    />
  );
};

TaskItemProvider.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string,
        completed: PropTypes.bool,
    }).isRequired,
}

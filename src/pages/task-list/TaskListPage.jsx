import { TaskListCard } from "./components/task-list-card/TaskListCard";
import PropTypes from "prop-types";

export const TaskListPage = ({ taskLists, onCreateTaskListHandler }) => {
  return (
    <div className="w-auto">
      <div className="grid grid-cols-3 gap-4" data-testid="task-list-container">
        {taskLists.map((taskList) => (
          <TaskListCard key={taskList.id} taskList={taskList} />
        ))}
        {taskLists.length === 0 && (
          <h2 className="text-purple-600">There no task lists yet. Please create at least one!</h2>
        )}
      </div>
      <div className="pt-6 flex items-center">
        <button
          onClick={onCreateTaskListHandler}
          className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: "all .15s ease" }}
        >
          Create Task List{" "}
        </button>
      </div>
    </div>
  );
};

TaskListPage.propTypes = {
  taskList: PropTypes.array,
  onCreateTaskListHandler: PropTypes.func,
};

TaskListPage.defaultProps = {
  taskLists: [],
  onCreateTaskListHandler: () => {},
};

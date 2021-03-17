import { useRedirect } from "features/shared/application/useRedirect";
import PropTypes from "prop-types";
import { TaskItemProvider } from "../components/task-item/TaskItemProvider";

export const TaskListPage = ({ taskList, isFetched }) => {
  const { redirectTo } = useRedirect();

  return (
    <div>
      <header className="flex justify-between py-5 border-b-2 border-pink-800">
        <h2 className="text-purple-900 font-bold py-5 text-lg">
          Task List: {taskList?.title}
        </h2>
        <button
          style={{ transition: "all .15s ease" }}
          className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-5 py-1 rounded outline-none focus:outline-none mx-1 mb-1"
          onClick={redirectTo("/")}
        >
          Back to the Home Page
        </button>
      </header>
      <ul className="py-2">
        {isFetched &&
          taskList.tasks &&
          taskList.tasks.map((task) => (
            <TaskItemProvider key={task.id} task={task} />
          ))}
      </ul>
    </div>
  );
};

TaskListPage.propTypes = {
  taskList: PropTypes.shape({
    title: PropTypes.string,
    tasks: PropTypes.array,
  }),
  isFetched: PropTypes.bool,
};

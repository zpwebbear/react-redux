import { useTaskListGetAll } from "features/task-list/application/use-cases/useTaskListGetAll";
import { useTaskListShowCreateDialog } from "features/task-list/application/use-cases/useTaskListShowCreateDialog";
import { TaskListCard } from "pages/task-list/components/task-list-card/TaskListCard";

const useTaskListViewPageState = () => {
  const { data: taskLists, error, isFetched } = useTaskListGetAll();
  const { showTaskListCreateDialog } = useTaskListShowCreateDialog();

  return {
    taskLists,
    error,
    isFetched,
    showTaskListCreateDialog,
  };
};

export const TaskListViewPage = () => {
  const {
    showTaskListCreateDialog,
    error,
    isFetched,
    taskLists,
  } = useTaskListViewPageState();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <header className="flex justify-between py-5 border-b-2 border-pink-800">
        <h2 className="text-purple-900 font-bold py-5 text-lg">Task Lists</h2>
        <button
          onClick={showTaskListCreateDialog}
          className="transition-all duration-150 text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-5 py-1 rounded outline-none focus:outline-none mx-1 mb-1"
          type="button"
        >
          Create Task List
        </button>
      </header>
      <div
        className="grid grid-cols-3 gap-4 my-3"
        data-testid="task-list-container"
      >
        {isFetched &&
          taskLists.map((taskList) => (
            <TaskListCard key={taskList.id} taskList={taskList} />
          ))}
        {isFetched && taskLists.length === 0 && (
          <h3 className="text-purple-600">
            There no task lists yet. Please create at least one!
          </h3>
        )}
      </div>
      <div className="pt-6 flex items-center"></div>
    </>
  );
};

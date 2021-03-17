import { taskListRepository } from "features/task-list/infrastructure/repositories/TaskListRepository";
import { taskRepository } from "features/task-list/infrastructure/repositories/TaskRepository";
import { useTaskListService } from "features/task-list/application/useTaskListService";
import { TaskListCard } from "pages/task-list/components/task-list-card/TaskListCard";

export const TaskListViewPage = () => {
  const { useTaskListGetAll, useTaskListCreate } = useTaskListService({
    taskListAPI: taskListRepository,
    taskAPI: taskRepository,
  });
  const { data: taskLists, error, isFetched } = useTaskListGetAll();

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <header className="flex justify-between py-5 border-b-2 border-pink-800">
        <h2 className="text-purple-900 font-bold py-5 text-lg">Task Lists</h2>
        <button
          onClick={useTaskListCreate}
          className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-5 py-1 rounded outline-none focus:outline-none mx-1 mb-1"
          type="button"
          style={{ transition: "all .15s ease" }}
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

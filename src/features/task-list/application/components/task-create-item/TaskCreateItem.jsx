import { useTaskCreateItemState } from "./useTaskCreateItemState";

export const TaskCreateItem = () => {
  const {
    newTaskTitle,
    setNewTaskListTitleHandler,
    taskCreateSubmitHandler,
    isLoading,
    newTaskInputRef
  } = useTaskCreateItemState();

  return (
    <form
      className="flex justify-between max-w-sm py-2"
      onSubmit={taskCreateSubmitHandler}
    >
      <input
        ref={newTaskInputRef}
        disabled={isLoading}
        type="text"
        name="new-task"
        id="new-tasks"
        className="disabled:opacity-50 focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder="New task title"
        value={newTaskTitle}
        onChange={setNewTaskListTitleHandler}
      />
      <button
        disabled={isLoading}
        type="submit"
        className="flex-shrink-0 ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
      >
        Create Task
      </button>
    </form>
  );
};

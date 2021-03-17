export function updateTaskInTaskList(oldTaskList, updatedTodo) {
  return {
    ...oldTaskList,
    tasks: oldTaskList.tasks.map((oldTodo) => {
      if (oldTodo.id === updatedTodo.id) {
        return {
          ...oldTodo,
          ...updatedTodo,
        };
      }
      return oldTodo;
    }),
  };
}

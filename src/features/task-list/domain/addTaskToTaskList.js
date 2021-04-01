export function addTaskToTaskList(oldTaskList, newTask) {
  if ("id" in newTask === false) {
    newTask.id = Number(performance.now().toFixed(0));
  }

  return {
    ...oldTaskList,
    tasks: [...oldTaskList.tasks, newTask],
  };
}

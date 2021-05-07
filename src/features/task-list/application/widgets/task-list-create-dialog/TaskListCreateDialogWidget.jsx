import React from "react";
import { TaskItemCreateAndEditComponent } from "../../components/task-item/create-and-edit/TaskItemCreateAndEditComponent";
import { TaskItemComponent } from "../../components/task-item/item/TaskItemComponent";
import { TaskItemListWidget } from "../task-item-list/TaskItemListWidget";
import { useTaskListCreateDialogState } from "./useTaskListCreateDialogWidgetState";

export const TaskListCreateDialogWidget = () => {
  const {
    taskListTitle,
    taskListProcessing,
    createTaskListHandler,
    updateTaskListTitleHandler,
    closeTaskListCreateDialogHandler,
  } = useTaskListCreateDialogState();

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={createTaskListHandler}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Create New Task List
                  </h3>
                  <div className="mt-2 py-5">
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="task-list-title"
                        id="task-list-title"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Task List Title"
                        value={taskListTitle}
                        onChange={(e) =>
                          updateTaskListTitleHandler({ title: e.target.value })
                        }
                      />
                    </div>
                    <div className="mt-1">
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Items
                        </label>
                        <div className="mt-1">
                          <TaskItemListWidget
                            context="taskListCreateDialog"
                            newTaskItem={
                              <TaskItemCreateAndEditComponent context="taskListCreateDialog" />
                            }
                          >
                            <TaskItemComponent context="taskListCreateDialog" />
                          </TaskItemListWidget>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                disabled={taskListProcessing}
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm  disabled:opacity-50"
              >
                Create
              </button>
              <button
                disabled={taskListProcessing}
                onClick={closeTaskListCreateDialogHandler}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm  disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

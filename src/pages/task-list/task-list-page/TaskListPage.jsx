import { TaskItemCreateAndEditComponent } from "features/task-list/application/components/task-item/create-and-edit/TaskItemCreateAndEditComponent";
import { TaskItemComponent } from "features/task-list/application/components/task-item/item/TaskItemComponent";
import { TaskItemListWidget } from "features/task-list/application/widgets/task-item-list/TaskItemListWidget";
import { TaskListPageHeaderComponent } from "features/task-list/application/components/task-list-page-header/TaskListPageHeaderComponent";
import { Suspense } from "react";

export const TaskListPage = () => {
  return (
    <div>
      <TaskListPageHeaderComponent context="taskListPage" />
      <Suspense fallback={<div>Task List Loading...</div>}>
        <TaskItemListWidget
          context="taskListPage"
          newTaskItem={
            <TaskItemCreateAndEditComponent context="taskListPage" />
          }
        >
          <TaskItemComponent context="taskListPage" />
        </TaskItemListWidget>
      </Suspense>
    </div>
  );
};

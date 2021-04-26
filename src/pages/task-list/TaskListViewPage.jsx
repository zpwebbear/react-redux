import { TaskListCardComponent } from "features/task-list/application/components/task-list-card/TaskListCardComponent";
import { TaskListViewPageHeaderComponent } from "features/task-list/application/components/task-list-view-page-header/TaskListViewPageHeaderComponent";
import { TaskListCardListWidget } from "features/task-list/application/widgets/task-list-card-list/TaskListCardListWidget";
import { Suspense } from "react";

export const TaskListViewPage = () => {
  return (
    <>
      <TaskListViewPageHeaderComponent context="taskListViewPage" />
      <Suspense fallback={<div>Task Lists Are Loading...</div>}>
        <TaskListCardListWidget context="taskListViewPage">
          <TaskListCardComponent context="taskListViewPage" />
        </TaskListCardListWidget>
      </Suspense>
    </>
  );
};

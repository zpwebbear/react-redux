import { createHookEntity } from "app/container/utils/createHookEntity";
import { useQueryFactory } from "app/container/utils/useQueryFactory";
import { useTaskListGetById } from "features/task-list/infrastructure/repositories/TaskListReactQueryRepository";
import { useMemo } from "react";

export const useTaskListTitleQuery = ({ taskListId }) => {
  const { data: taskListTitle } = useTaskListGetById({
    queryKey: ["task-list", taskListId],
    queryFnParams: taskListId,
    queryOptions: {
      select: (t) => t.title,
      suspense: true,
      staleTime: Infinity,
    },
  });

  const subscribable = useMemo(
    () =>
      createHookEntity({
        "task-list/title": taskListTitle,
      }),
    [taskListTitle]
  );

  return useQueryFactory({ subscribable });
};

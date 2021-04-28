import { createHookEntity } from "app/container/utils/createHookEntity";
import { useQueryFactory } from "app/container/utils/useQueryFactory";
import { useMemo } from "react";
import { useTaskListGetById } from "../use-cases/useTaskListGetById";

export const useTaskListTitleQuery = ({ id }) => {
  const { data: taskListTitle } = useTaskListGetById(id, {
    select: (t) => t.title,
    suspense: true,
    staleTime: Infinity,
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

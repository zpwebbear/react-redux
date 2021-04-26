import { useCaseFactory } from "app/use-case/useCaseFactory";
import { useTaskListGetAllIds } from "features/task-list/infrastructure/repositories/TaskListReactQueryRepository";
import { useMemo, useRef } from "react";
import { useQueryClient } from "react-query";

export const useTaskListIdsQuery = () => {
  const events = useRef(new Map());

  const queryClient = useQueryClient();
  const { data: taskListIds, isFetched, error } = useTaskListGetAllIds(
    ["task-list"],
    {},
    {
      onSuccess: () => {
        const taskLists = queryClient.getQueryData(["task-list"]);
        taskLists.forEach((taskList) => {
          queryClient.setQueryData(["task-list", taskList.id], taskList);
        });
      },
      suspense: true,
      staleTime: Infinity,
    }
  );

  const subscribable = useMemo(
    () =>
      new Map([
        ["task-list/ids", taskListIds],
        ["task-list/is-fetched", isFetched],
        ["task-list/error", error],
      ]),
    [error, isFetched, taskListIds]
  );
  const dispatchable = useMemo(() => new Map(), []);

  return useCaseFactory({ dispatchable, subscribable, events });
};

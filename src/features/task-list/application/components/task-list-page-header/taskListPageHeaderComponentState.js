//@ts-check
import { useRedirect } from "features/shared/application/useRedirect";
import { useCallback } from "react";
import { useTaskListGetById } from "../../use-cases/useTaskListGetById";

export const useTaskListHeaderOnTaskListPage = () => {
  const { redirectTo } = useRedirect();
  const { data: taskList } = useTaskListGetById(null, {
    select: (t) => ({ title: t.title }),
  });

  const redirectHandler = useCallback(() => {
    redirectTo("/")();
  }, [redirectTo]);

  const taskListTitle = taskList?.title;

  return {
    redirectHandler,
    taskListTitle,
  };
};

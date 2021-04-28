//@ts-check
import { useAppCommand, useAppQuery } from "app/container/appContainer";
import { useCallback } from "react";

export const useTaskListHeaderOnTaskListPage = () => {
  const { dispatch } = useAppCommand("app/redirect");
  const appRouterParams = useAppQuery("app/router/params", { token: "id" });
  const id = appRouterParams.subscribe("id");

  const { subscribe } = useAppQuery("task-list/get/title", { id });

  const redirectHandler = useCallback(() => {
    dispatch({ type: "redirect-to", payload: "/" });
  }, [dispatch]);

  const taskListTitle = subscribe("task-list/title");

  return {
    redirectHandler,
    taskListTitle,
  };
};

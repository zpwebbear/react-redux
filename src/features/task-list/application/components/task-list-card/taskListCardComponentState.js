import { useAppCommand, useAppQuery } from "app/container/appContainer";
import { useCallback } from "react";

export const useTaskListCardOnTaskListPage = ({ id }) => {
  const { dispatch } = useAppCommand("app/redirect");

  const { subscribe } = useAppQuery("task-list/get/title", { taskListId: id });

  const taskListTitle = subscribe("task-list/title");

  const cardClickHandler = useCallback(() => {
    dispatch({
      type: "redirect-to",
      payload: `/task-list/${id}`,
    });
  }, [dispatch, id]);

  return {
    taskListTitle,
    cardClickHandler,
  };
};

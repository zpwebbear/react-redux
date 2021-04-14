import { useCallback } from "react";
import { useHistory } from "react-router";
import { useTaskListGetById } from "../../use-cases/useTaskListGetById";

export const useTaskListCardOnTaskListPage = ({ id }) => {
  const history = useHistory();
  const { data: taskListTitle } = useTaskListGetById(id, {
    select: (t) => t.title,
    suspense: true,
    staleTime: Infinity,
  });

  const cardClickHandler = useCallback(() => {
    history.push(`/task-list/${id}`);
  }, [history, id]);

  return {
    taskListTitle,
    cardClickHandler,
  };
};

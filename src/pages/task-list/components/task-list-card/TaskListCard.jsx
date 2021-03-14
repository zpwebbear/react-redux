import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export const TaskListCard = ({ taskList }) => {
  const history = useHistory();
  const id = taskList.id;

  const clickHandler = useCallback(() => {
    history.push(`/task-list/${id}`);
  }, [history, id]);
  
  return (
    <div className="cursor-pointer" onClick={clickHandler} data-testid="task-list-card">
      <h2>{taskList.title}</h2>
    </div>
  );
};

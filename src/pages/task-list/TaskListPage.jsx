import PropTypes from "prop-types";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { taskListAPI } from "../../api/task-list/TaskListAPI";
import { taskAPI } from "../../api/task/TaskAPI";
import { queryClient } from "../../App";
import { TaskItem } from "./components/task-item/TaskItem";

/**
 * TODO: This component need to be totally refactored
 * @param {*} props
 * @returns
 */
export const TaskListPage = (props) => {
  const { id } = useParams();
  const { data: taskList, isFetched } = useQuery({
    queryKey: `task-list/${id}`,
    queryFn: () => taskListAPI.getById(id),
  });

  /**
   * This is an example of the optimistic update
   */
  const mutation = useMutation(
    (newTodo) => {
      taskAPI.replace(newTodo.id, newTodo);
    },
    {
      onMutate: async (todo) => {
        await queryClient.cancelQueries(`task-list/${id}`);
        const previousValue = queryClient.getQueryData(`task-list/${id}`);
        queryClient.setQueryData(`task-list/${id}`, (old) => {
          return {
            ...old,
            tasks: old.tasks.map((oldTodo) => {
              if (oldTodo.id === todo.id) {
                return {
                  ...oldTodo,
                  ...todo,
                };
              }
              return oldTodo;
            }),
          };
        });

        return previousValue;
      },
      // On failure, roll back to the previous value
      onError: (err, variables, previousValue) =>
        queryClient.setQueryData(`task-list/${id}`, previousValue),
      // After success or failure, refetch the todos query
      onSuccess: () => {
        // Set timeout is needed here to wait the server process the data
        setTimeout(() => {
          queryClient.invalidateQueries(`task-list/${id}`);
        }, 500);
      },
    }
  );

  return (
    <div>
      <header className="py-5">
        <Link className="pr-5 hover:text-purple-800 hover:underline" to="/">Back to the Home Page</Link>
      </header>
      <ul>
        {isFetched &&
          taskList.tasks &&
          taskList.tasks.map((task) => (
            <TaskItem
              key={task.id}
              taskItem={task}
              onCheckHandler={() =>
                mutation.mutate({ ...task, completed: !task.completed })
              }
            />
          ))}
      </ul>
    </div>
  );
};

TaskListPage.propTypes = {
  taskList: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        completed: PropTypes.bool,
      })
    ),
  }),
};

import { render, screen } from "@testing-library/react";
import { TaskListViewPage } from "./TaskListViewPage";

const tasksLists = [
  { id: 1, title: "Task List 1" },
  { id: 2, title: "Task List 2" },
  { id: 3, title: "Task List 3" },
];

describe("TaskListViewPage", () => {
  test("Render the proper number of task lists", async () => {
    render(<TaskListViewPage taskLists={tasksLists} />);

    const taskListContainer = screen.getByTestId("task-list-container");

    expect(taskListContainer.children.length).toEqual(3);
  });

  test("Render the placeholder when no task list exists", async () => {
    render(<TaskListViewPage taskLists={[]} />);

    const taskListContainer = screen.getByTestId("task-list-container");

    expect(taskListContainer).toHaveTextContent(
      "There no task lists yet. Please create at least one!"
    );
  });

  test("Call the onCreateTaskListHandler on the button click", () => {
    const onCreateTaskListHandler = jest.fn();

    render(
      <TaskListViewPage
        taskLists={tasksLists}
        onCreateTaskListHandler={onCreateTaskListHandler}
      />
    );

    const createNewTaskListButton = screen.getByText("Create Task List");
    createNewTaskListButton.click();

    expect(onCreateTaskListHandler).toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import { TaskListCard } from "./TaskListCard";

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("TaskListCard", () => {
  beforeEach(() => {
    render(<TaskListCard taskList={{ id: 1, title: "Test Task List" }} />);
  });

  test("Redirect to proper location on the card click", async () => {
    const taskListCardWrapper = await screen.findByTestId("task-list-card");
    taskListCardWrapper.click();

    expect(mockHistoryPush).toHaveBeenCalledWith("/task-list/1");
  });

  test("Show the proper task list name", async () => {
    const taskListCardWrapper = await screen.findByTestId("task-list-card");

    expect(taskListCardWrapper).toHaveTextContent("Test Task List");
  });
});

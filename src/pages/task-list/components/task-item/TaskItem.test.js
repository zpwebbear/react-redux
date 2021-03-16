const { render, screen } = require("@testing-library/react");
const { TaskItem } = require("./TaskItem");

describe("TaskItem", () => {
  test("the correct checkbox state", async () => {
    const onCheckHandler = jest.fn();
    render(
      <TaskItem
        taskItem={{ id: "id", title: "Task Item", completed: true }}
        onCheckHandler={onCheckHandler}
      />
    );

    const taskItemCheckbox = await screen.findByTestId("task-item-checkbox");

    expect(taskItemCheckbox.checked).toEqual(true);
  });

  test("correct checkbox functionality", async () => {
    const onCheckHandler = jest.fn();
    const {rerender} = render(
      <TaskItem
        taskItem={{ id: "id", title: "Task Item", completed: true }}
        onCheckHandler={onCheckHandler}
      />
    );

    const taskItemCheckbox = await screen.findByTestId("task-item-checkbox");
    taskItemCheckbox.click();

    expect(onCheckHandler).toHaveBeenCalled();
    rerender(
      <TaskItem
        taskItem={{ id: "id", title: "Task Item", completed: false }}
        onCheckHandler={onCheckHandler}
      />
    );
    const taskItemCheckboxUpdated = await screen.findByTestId("task-item-checkbox");
    expect(taskItemCheckboxUpdated.checked).toEqual(false);
  });
});

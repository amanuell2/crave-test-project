import { render, screen } from "@testing-library/react";
import TaskListItem from "../TaskListItem";

const task = {
  parentId: "p-1",
  toggleSubTask: () => {},
  id: 1,
  task: "to do item",
  isCompleted: true,
};

it("should display task title", async () => {
  render(<TaskListItem {...{ ...task }} />);
  const title = screen.queryByTitle("task-item");
  expect(title.textContent).toBe("to do item");
});

it("should not be checked if the task is not  completed", async () => {
  render(<TaskListItem {...{ ...task }} />);
  const checkbox = screen.queryByRole("checkbox");
  expect(checkbox).toBeChecked();
});

it("should set checked  task on check", async () => {
  const toggleSubTask = jest.fn();
  render(<TaskListItem {...{ ...task, ...{ toggleSubTask } }} />);
  const checkbox = screen.queryByRole("checkbox");
  checkbox.click();
  expect(toggleSubTask).toHaveBeenCalled();
});

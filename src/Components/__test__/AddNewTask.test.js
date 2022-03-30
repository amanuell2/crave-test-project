import { render, screen, fireEvent } from "@testing-library/react";
import AddNewTask from "../AddNewTask";

const onAddNewTaskClick = (task) => {
  console.log(task);
};
const addingNewTask = true;

it("should  render input element if we are adding new task", async () => {
  render(<AddNewTask {...{ addingNewTask, onAddNewTaskClick }} />);

  const buttonElement = screen.getByRole("button", {
    name: "Add new task",
  });
  buttonElement.click();
  const inputElement = screen.getByPlaceholderText(/new task/i);
  expect(inputElement).toBeInTheDocument();
});

it("should remove input element if we are not adding new task", async () => {
  render(<AddNewTask {...{ addingNewTask, onAddNewTaskClick }} />);
  const buttonElement = screen.getByRole("button", {
    name: "Add new task",
  });
  buttonElement.click();
  const inputElement = screen.getByPlaceholderText(/new task/i);
  const CancelButtonElement = screen.getByRole("button", { name: "Cancel" });
  CancelButtonElement.click();
  expect(inputElement).not.toBeInTheDocument();
});

it("should update state on input change", async () => {
  render(<AddNewTask addNewTask={onAddNewTaskClick} />);
  const buttonElement = screen.getByRole("button", {
    name: "Add new task",
  });
  buttonElement.click();
  const inputElement = screen.getByPlaceholderText(/new task/i);
  fireEvent.change(inputElement, { target: { value: "new task" } });
  expect(inputElement.value).toBe("new task");
});

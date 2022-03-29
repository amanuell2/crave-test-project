import { render, screen } from "@testing-library/react";
import TaskListCard from "../TaskListCard";

const tasks = {
  id: "1",
  title: "Foundation",
  isLocked: true,
  subTask: [],
};

it("should render card title", async () => {
  render(<TaskListCard {...{ ...tasks, ...{ index: 1 } }} />);
  const title = screen.getByRole("heading", {
    name: "Foundation",
  });
  expect(title).toBeInTheDocument();
});

it("should hide icon if task is locked", async () => {
  render(<TaskListCard {...{ ...tasks, ...{ index: 1 } }} />);
  const spanElement = screen.queryByTitle("check-icon");
  expect(spanElement).not.toBeInTheDocument();
});

it("should show task number based on the index of the task", async () => {
  render(<TaskListCard {...{ ...tasks, ...{ index: 0 } }} />);
  const number = screen.getByTitle("task-number").textContent;
  expect(number).toEqual("1");
});

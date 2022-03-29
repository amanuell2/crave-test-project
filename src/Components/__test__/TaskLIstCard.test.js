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

it("should hide icon if task locked", async () => {
  render(<TaskListCard {...{ ...tasks, ...{ index: 1 } }} />);
  const icon = screen.queryByTitle("check-icon");
  expect(icon).not.toBeInTheDocument();
});

it("should show task number", async () => {
  render(<TaskListCard {...{ ...tasks, ...{ index: 0 } }} />);
  const number = screen.getByTitle("task-number").textContent;
  expect(number).toEqual("1");
});

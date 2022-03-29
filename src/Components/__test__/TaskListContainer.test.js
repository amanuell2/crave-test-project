import { render, screen } from "@testing-library/react";
import TaskListContainer from "../TaskListContainer";

test("renders task list container", () => {
  render(<TaskListContainer />);
  const linkElement = screen.getByRole("heading", {
    name: "My Startup Progress",
  });
  expect(linkElement).toBeInTheDocument();
});

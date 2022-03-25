import React, { useEffect } from "react";

const TaskListItem = ({ id, task, isCompleted }) => {
  const [completed, setCompleted] = React.useState(isCompleted);
  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleClick = (e) => {
    setCompleted(e.target.checked);
  };
  return (
    <div className="flex justify-start items-center">
      <input
        id={id + Math.random}
        className="w-4 h-4 "
        type="checkbox"
        checked={completed}
        onChange={handleClick}
      />
      <span className="text-sm font-medium flex-1 mx-2">{task}</span>
    </div>
  );
};

export default TaskListItem;

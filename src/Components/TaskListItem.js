import React, { useEffect } from "react";

const TaskListItem = ({ parentId, toggleSubTask, id, task, isCompleted }) => {
  const [completed, setCompleted] = React.useState(isCompleted);
  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleClick = (e) => {
    setCompleted(e.target.checked);
    toggleSubTask(parentId, id);
  };
  return (
    <div className="flex justify-start items-center my-1">
      <input
        id={id + Math.random}
        className="w-4 h-4 accent-blue-800"
        type="checkbox"
        checked={completed}
        onChange={handleClick}
      />
      <span title="task-item" className="text-sm flex-1 mx-2">
        {task}
      </span>
    </div>
  );
};

export default TaskListItem;

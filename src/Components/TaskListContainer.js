import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Context/TaskContext";
import TaskListCard from "./TaskListCard";

const TaskListContainer = () => {
  const taskContext = useContext(TaskContext);
  const { tasks } = taskContext;
  const [_tasks, _setTasks] = useState([]);
  useEffect(() => {
    _setTasks(tasks);
  }, [tasks]);
  return (
    <div className="w-82 bg-zinc-100 border-2 border-gray-100 rounded-sm shadow-md p-1">
      <div className="m-4 p-4 flex flex-col items-center justify-content-start bg-white">
        <div className="w-64 h-8 bg-white">
          <h1 className="font-semibold text-lg">My Startup Progress</h1>
        </div>
        {_tasks.map((task, index) => (
          <TaskListCard key={task.id} {...{ ...task, index }} />
        ))}
      </div>
    </div>
  );
};

export default TaskListContainer;

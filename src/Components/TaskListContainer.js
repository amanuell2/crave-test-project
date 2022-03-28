import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../Context/TaskContext";
import TaskListCard from "./TaskListCard";

const TaskListContainer = () => {
  const taskContext = useContext(TaskContext);
  const { tasks, rate, isAllTasksAreCompleted, loading } = taskContext;
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
        {loading && <div>Loading...</div>}
        {!loading && rate.currency && isAllTasksAreCompleted() && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-lg">
              You have completed all tasks.
            </h1>
            <h1 className="font-semibold text-lg">
              You have earned 100 {rate.currency}.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListContainer;

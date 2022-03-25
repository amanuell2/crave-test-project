import React from "react";
import TaskListCard from "./TaskListCard";

const TaskListContainer = () => {
  return (
    <div className="w-96  bg-zinc-100 border-2 border-gray-100 rounded-sm shadow-md">
      <div className="m-4 p-4 flex flex-col items-center justify-content-start bg-white">
        <div className="w-72 h-8 bg-white">
          <h1 className="font-semibold text-lg">My Startup Progress</h1>
        </div>
        <TaskListCard />
        <TaskListCard />
        <TaskListCard />
      </div>
    </div>
  );
};

export default TaskListContainer;

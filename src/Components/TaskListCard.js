import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import TaskListItem from "./TaskListItem";

const TaskListCard = () => {
  return (
    <div className="w-72 bg-white rounded-sm px-1">
      <div className="flex justify-between items-center">
        <span className="bg-black rounded-full w-6 h-6 text-white text-center">
          1
        </span>
        <h1 className="font-semibold text-md flex-1 mx-2">Foundation</h1>
        <span className="text-3xl font-bold">
          <IoIosCheckmark size={64} />
        </span>
      </div>
      {[
        { id: 1, task: "Setup virtual office", isCompleted: true },
        { id: 2, task: "Set mission & vision", isCompleted: true },
        { id: 3, task: " business name", isCompleted: true },
        { id: 4, task: "Buy domain", isCompleted: false },
      ].map((item) => (
        <TaskListItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default TaskListCard;

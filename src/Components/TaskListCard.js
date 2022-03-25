import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import TaskListItem from "./TaskListItem";

const TaskListCard = ({ id, title, isLocked, subTask }) => {
  return (
    <div className="w-72 bg-white rounded-sm px-1">
      <div className="flex justify-between items-center">
        <span className="bg-black rounded-full w-6 h-6 text-white text-center">
          1
        </span>
        <h1 className="font-semibold text-md flex-1 mx-2">{title}</h1>
        <span className="text-3xl font-bold">
          <IoIosCheckmark size={64} />
        </span>
      </div>
      {subTask.map((task, index) => (
        <TaskListItem key={index + Math.random} {...task} />
      ))}
    </div>
  );
};

export default TaskListCard;

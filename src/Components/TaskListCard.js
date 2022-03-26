import React, { useContext } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { TaskContext } from "../context/TaskContext";
import TaskListItem from "./TaskListItem";

const TaskListCard = ({ index, id, title, isLocked, subTask }) => {
  const taskContext = useContext(TaskContext);
  const { toggleSubTask } = taskContext;
  return (
    <div className="w-64 bg-white rounded-sm px-1 my-2">
      <div className="flex h-12 justify-between items-center my-1">
        <span className="bg-black rounded-full w-6 h-6 text-white text-center text-md font-normal">
          {index + 1}
        </span>
        <h1 className="font-semibold text-md flex-1 mx-2">{title}</h1>
        {!isLocked && (
          <span className="font-bold">
            <IoIosCheckmark size={64} />
          </span>
        )}
      </div>
      {subTask.map((task) => (
        <TaskListItem
          key={Math.random()}
          {...{ ...task, ...{ parentId: id }, ...{ toggleSubTask } }}
        />
      ))}
    </div>
  );
};

export default TaskListCard;

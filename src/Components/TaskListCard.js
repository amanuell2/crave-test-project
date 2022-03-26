import React, { useContext } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { TaskContext } from "../Context/TaskContext";
import { idGenerator } from "../Helper/helper";
import AddNewTask from "./AddNewTask";
import TaskListItem from "./TaskListItem";

const TaskListCard = ({ index, id, title, isLocked, subTask }) => {
  const taskContext = useContext(TaskContext);
  const { toggleSubTask, addSubTask } = taskContext;

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
      <AddNewTask
        onAddNewTaskClick={(task) =>
          addSubTask(id, {
            id: idGenerator(),
            task,
            isCompleted: false,
          })
        }
      />
    </div>
  );
};

export default TaskListCard;

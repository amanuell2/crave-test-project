import React from "react";
import { IoIosAdd } from "react-icons/io";

const AddNewTask = () => {
  const [addingNewTask, setAddingNewTask] = React.useState(false);

  const toggleAddingNewTask = () => {
    setAddingNewTask(!addingNewTask);
  };
  return (
    <div className="w-full h-14">
      {addingNewTask && (
        <div className="flex flex-row justify-between items-center border-blue-500 border-2 rounded-md my-1">
          <input
            type="text"
            className="w-full bg-white text-sm text-gray-500 m-1 px-2 flex-1 focus:outline-none"
            placeholder="new task"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-sm">
            <IoIosAdd size={14} />
          </button>
        </div>
      )}
      <button
        className="w-full h-8 text-sm bg-gray-100 rounded-sm border-dotted border-2 border-gray-300 hover:bg-gray-300"
        onClick={toggleAddingNewTask}
      >
        {addingNewTask ? "Cancel" : "Add new task"}
      </button>
    </div>
  );
};

export default AddNewTask;

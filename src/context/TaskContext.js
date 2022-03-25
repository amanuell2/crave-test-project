import React, { createContext } from "react";

const idGenerator = () => Math.random().toString(36).substr(2, 9);

const initialState = [
  {
    id: idGenerator(),
    title: "Foundation",
    isLocked: true,
    subTask: [
      {
        id: idGenerator(),
        task: "Setup virtual office",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "Set mission and Vision",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "Select bushiness name",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "BUy domains",
        isCompleted: true,
      },
    ],
  },
  {
    id: idGenerator(),
    title: "Discovery",
    isLocked: false,
    subTask: [
      {
        id: idGenerator(),
        task: "Create road map",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "Competitor analysis",
        isCompleted: false,
      },
    ],
  },
  {
    id: idGenerator(),
    title: "Delivery",
    isLocked: false,
    subTask: [
      {
        id: idGenerator(),
        task: "Release marketing website",
        isCompleted: false,
      },
      {
        id: idGenerator(),
        task: "Release MVP",
        isCompleted: false,
      },
    ],
  },
];

export const TaskContext = createContext({
  tasks: [],
  addTask: (task) => {},
  toggleTask: (id) => {},
  addSubTask: (id, subTask) => {},
  toggleSubTask: (id, subTaskId) => {},
  findById: (id) => {},
});

const TaskContextProvider = (props) => {
  const [tasks, setTasks] = React.useState(initialState);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isLocked = !task.isLocked;
        }
        return task;
      })
    );
  };

  const addSubTask = (id, subTask) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.subTask = [...task.subTask, subTask];
        }
        return task;
      })
    );
  };

  const toggleSubTask = (id, subTaskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.subTask = task.subTask.map((subTask) => {
            if (subTask.id === subTaskId) {
              subTask.isCompleted = !subTask.isCompleted;
            }
            return subTask;
          });
        }
        return task;
      })
    );
  };

  const findById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        addSubTask,
        toggleSubTask,
        findById,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;

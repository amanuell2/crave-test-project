import React, { createContext } from "react";
import { idGenerator } from "../Helper/helper";

const initialState = [
  {
    id: idGenerator(),
    title: "Foundation",
    isLocked: false,
    subTask: [
      {
        id: idGenerator(),
        task: "Setup virtual office",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "Set mission & Vision",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "Select bushiness name",
        isCompleted: true,
      },
      {
        id: idGenerator(),
        task: "Buy domains",
        isCompleted: true,
      },
    ],
  },
  {
    id: idGenerator(),
    title: "Discovery",
    isLocked: true,
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
    isLocked: true,
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

  const toggleTask = (id, isLocked) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isLocked = isLocked;
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
    shouldUnlockTask(id);
    updateTasksLockedStatus(id);
  };

  const toggleSubTask = async (id, subTaskId) => {
    await setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.subTask = task.subTask.map((subTask) => {
            if (subTask.id === subTaskId) {
              subTask.isCompleted = !subTask.isCompleted;
            }
            return subTask;
          });
          if (!task.subTask.isCompleted) toggleTask(id, true);
        }
        return task;
      })
    );

    shouldUnlockTask(id);
    updateTasksLockedStatus(id);
  };

  const findById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const isAllSubTaskAreCompleted = (subTask) => {
    let isCompleted = true;
    if (!subTask.length > 0) return false;
    subTask.forEach((task) => {
      if (!task.isCompleted) {
        isCompleted = false;
      }
    });
    return isCompleted;
  };

  const isPreviousTaskCompleted = (task) => {
    let index = tasks.indexOf(task);
    if (index === 0) return true;
    let perviousTask = tasks[index - 1];
    if (perviousTask) return !perviousTask.isLocked;
  };

  const shouldUnlockTask = async (id) => {
    let task = await findById(id);
    let canUnlockTaskNextTask = await isAllSubTaskAreCompleted(task.subTask);
    if (canUnlockTaskNextTask && isPreviousTaskCompleted(task)) {
      return toggleTask(id, false);
    }
    toggleTask(id, true);
  };

  const updateTasksLockedStatus = (id) => {
    const nextTask = getNextTask(id);
    if (nextTask) {
      let index = tasks.indexOf(nextTask);
      const nextTasks = tasks.slice(index, tasks.length);
      nextTasks.forEach((task) => {
        shouldUnlockTask(task.id);
      });
    }
  };

  const getNextTask = (id) => {
    const task = findById(id);
    const index = tasks.indexOf(task);
    if (index + 1 < tasks.length) {
      return tasks[index + 1];
    }
    return null;
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

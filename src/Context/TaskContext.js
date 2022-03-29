import { useLazyQuery } from "@apollo/client";
import React, { createContext, useEffect } from "react";
import { EXCHANGE_RATES } from "../graphql";
import {
  getLocalStorageItem,
  idGenerator,
  setLocalStorageItem,
} from "../Helper/helper";

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
  toggleTask: (id, isLocked) => {},
  addSubTask: (id, subTask) => {},
  toggleSubTask: (id, subTaskId) => {},
  findById: (id) => {},
});

const TaskContextProvider = (props) => {
  const [tasks, setTasks] = React.useState([]);
  const [getRates, { loading }] = useLazyQuery(EXCHANGE_RATES, {
    notifyOnNetworkStatusChange: true,
  });
  const [rate, setRate] = React.useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      const localTasks = await getTasks();
      if (localTasks) {
        return setTasks(localTasks);
      }
      await saveTasks(initialState);
      setTasks(getTasks);
    };
    fetchTask();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const toggleTask = async (id, isLocked) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.isLocked = isLocked;
        }
        return task;
      })
    );

    if (isAllTasksAreCompleted()) {
      const { data } = await getRates();
      setRate(data.rates[Math.floor(Math.random() * data.rates.length)]);
    }
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
    setTasks(
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

  const isAllTasksAreCompleted = () => {
    return tasks.every((task) =>
      task.subTask.every((subTask) => subTask.isCompleted)
    );
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
    return toggleTask(id, true);
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

  const saveTasks = (_tasks) => {
    if (!_tasks) return;
    return setLocalStorageItem("tasks", JSON.stringify(_tasks));
  };
  const getTasks = () => {
    console.log("fetching data");
    return JSON.parse(getLocalStorageItem("tasks"));
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        loading,
        isAllTasksAreCompleted,
        addSubTask,
        toggleSubTask,
        findById,
        rate,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;

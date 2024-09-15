import React, { createContext, useState, ReactNode } from 'react';

interface Task {
  title: string;
  todo: string[];
}

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
}
 

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
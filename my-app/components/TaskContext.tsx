import React, { createContext, useState, ReactNode } from 'react';

interface  Activity{
  name: string;
  state: boolean;
}

interface Task {
  title: string;
  todo: string[];

}

interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (index: number, updatedTask: Task) => void;
  deleteTask: (index: number) => void;
}
 

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (index: number, updatedTask: Task) => {
    setTasks(tasks.map((task, i) => (i === index ? updatedTask : task)));
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask}}>
      {children}
    </TaskContext.Provider>
  );
};
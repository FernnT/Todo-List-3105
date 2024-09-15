import React, { createContext, useState, ReactNode } from 'react';

interface  Activity{
  name: string;
  state: boolean;
}

interface Task {
  title: string;
  todo: Activity[];
  isFinish: boolean;
  isArchived?: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  archivedTasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (index: number, updatedTask: Task) => void;
  deleteTask: (index: number,isArchived?:boolean ) => void;
  archiveTask: (index: number) => void;
}
 

export const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (index: number, updatedTask: Task) => {
    setTasks(tasks.map((task, i) => (i === index ? updatedTask : task)));
  };

  const deleteTask = (index: number , isArchived?:boolean) => {
    if(isArchived){
      const newArchivedTasks = archivedTasks.filter((_, i) => i !== index);
      setArchivedTasks(newArchivedTasks);
    }else{
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    }
  };

  const archiveTask = (index: number) => {
    const taskToArchive = tasks[index].isArchived ? tasks[index] : { ...tasks[index], isArchived: true };
    const completedTask = {
      ...taskToArchive,
      todo: taskToArchive.todo.map(activity => ({ ...activity, state: true }))
    };
    setArchivedTasks([...archivedTasks, completedTask]);
    deleteTask(index);
  };

  return (
    <TaskContext.Provider value={{ tasks, archivedTasks, addTask, updateTask, deleteTask, archiveTask }}>
      {children}
    </TaskContext.Provider>
  );
};
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface  Activity{
  name: string;
  state: boolean;
}

interface Task {
  title: string;
  todo: Activity[];
  isFinish: boolean;
  isArchived: boolean;
}

interface TaskContextProps {
  tasks: Task[];
  archivedTasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (index: number, updatedTask: Task) => void;
  deleteTask: (index: number,isArchived?:boolean ) => void;
  archiveTask: (index: number) => void;
  restoreTask: (index: number) => void;
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

  const deleteTask = (index: number, isArchived: boolean = false) => {
    if (isArchived) {
      setArchivedTasks(prevArchivedTasks => prevArchivedTasks.filter((_, i) => i !== index));
    } else {
      setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    }
  };
  
  const archiveTask = (index: number) => {
    const taskToArchive = tasks[index].isArchived ? tasks[index] : { ...tasks[index], isArchived: true };
    deleteTask(index, false);
  
    setArchivedTasks(prevArchivedTasks => [...prevArchivedTasks, taskToArchive]);
  };
  
  const restoreTask = (index: number) => {
    const taskToRestore = archivedTasks[index];
    setTasks([...tasks, { ...taskToRestore, isArchived: false }]);
    deleteTask(index, true);
  };


  return (
    <TaskContext.Provider value={{ tasks, archivedTasks, addTask, updateTask, deleteTask, archiveTask, restoreTask }}>
      {children}
    </TaskContext.Provider>
  );
};
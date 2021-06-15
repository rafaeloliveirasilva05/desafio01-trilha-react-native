import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle === '') return

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, newTask])
  }

  function handleMarkTaskAsDone(id: number) {
    const tasksCopy = tasks.map(task => {
      if(task.id === id)
        return {
          ...task,
          done: !task.done
        }

      return task
    })

    setTasks(tasksCopy)
  }

  function handleRemoveTask(id: number) {
    const tasksCopy = tasks.filter(task => task.id !== id)

    setTasks(tasksCopy) 
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  );
}

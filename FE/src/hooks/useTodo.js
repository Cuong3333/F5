import { useState, useEffect } from 'react';

export const useTodo = () => {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage on tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === '') {
      alert('You must write something');
    } else {
      setTasks(prevTasks => [
        ...prevTasks,
        { text: input, completed: false }
      ]);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    setTasks(prevTasks => 
      prevTasks.map((task, i) => 
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  return {
    input,
    setInput,
    tasks,
    addTask,
    toggleTask,
    removeTask,
  };
};

// hooks/TodoContext.js
import React, { createContext, useContext, useState } from 'react';

// Tạo Context
const TodoContext = createContext();

// Hook để dễ dàng sử dụng TodoContext ở các thành phần khác
export const useTodoContext = () => useContext(TodoContext);

// Provider để bọc ứng dụng, cung cấp trạng thái nhiệm vụ
export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Hàm thêm nhiệm vụ
  const addTask = (taskText) => {
    setTasks([...tasks, { text: taskText, completed: false }]);
  };

  // Hàm chuyển đổi trạng thái hoàn thành của nhiệm vụ
  const toggleTask = (index) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  // Hàm xóa nhiệm vụ
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TodoContext.Provider>
  );
};

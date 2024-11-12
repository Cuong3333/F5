import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";



const PlanTask = ({ tasks }) => {
  const [tasksWithTime, setTasksWithTime] = useState([]);

  useEffect(() => {
    const currentTime = new Date();

    const tasksWithCalculatedTime = tasks.map((task, index) => {
      const taskTime = new Date(currentTime);
      taskTime.setMinutes(taskTime.getMinutes() + 17 * index); // Cộng thêm 17 phút vào mỗi nhiệm vụ
      return {
        ...task, // Giữ nguyên thông tin của task
        time: taskTime.toLocaleTimeString(), // Thêm thuộc tính 'time' vào mỗi task
      };
    });

    setTasksWithTime(tasksWithCalculatedTime); // Cập nhật state với dữ liệu đã được tính toán thời gian
  }, [tasks]);

  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasksWithTime?.map((task, index) => (
        <TaskCard task={task} key={index} /> 
      ))}
    </div>
  );
};

export default PlanTask;

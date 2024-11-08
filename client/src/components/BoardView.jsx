import React from "react";
//component
import TaskCard from "./TaskCard";

//hiển thị danh sách các nhiệm vụ (tasks) dưới dạng các thẻ (cards) trong một bố cục dạng lưới
const BoardView = ({ tasks }) => { 
  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {tasks.map((task, index) => (
        // Thẻ nhiệm vụ
        <TaskCard task={task} key={index} />
      ))}
    </div>
  );
};

export default BoardView;

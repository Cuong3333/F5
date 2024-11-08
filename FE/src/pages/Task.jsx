import React, { useState } from "react";
import { useParams } from "react-router-dom"; //để lấy các tham số từ URL trong một ứng dụng React
// data
import { tasks } from "../assets/data"; // lấy tasks
// componets
import Loading from "../components/Loader.jsx";
import Title from "../components/Title";
import Button from "../components/Button";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
// icon
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

// lưu trữ màu dưa trên công việc
const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {

  const params = useParams(); //để lấy các tham số động từ URL hiện tại của nguoi dung

  const [selected, setSelected] = useState(0); // lưu trữ trạng thái chọn
  const [open, setOpen] = useState(false); // lưu trữ trạng thái mở đóng
  const [loading, setLoading] = useState(false); // trạng thái loading

  // lấy link hiện tại người dùng đang đứng
  const status = params?.status || ""; //Nếu params?.status là undefined hoặc null, phần || "" sẽ cung cấp giá trị mặc định là chuỗi rỗng "".


  // nếu chưa tải nội dung thì hiển thị biểu tượng loading
  return loading ? (

    // {/* compunents này xử lý khi người dùng click nếu chưa tải trang thì sẽ có biểu tượng loading */}
    <div className='py-10'>
      
      <Loading />

    </div>

  ) : (
    // nếu có nội dụng thì mới hiển thị

    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>

        {/* trạng thái link hiện tại nếu có giá trị */}
        {/* Đoạn này sẽ điều chỉnh tiêu đề của trang hoặc phần tử sao cho phù hợp với trạng thái (chẳng hạn như "Active Tasks" hoặc "Completed Tasks"). */}
        <Title title={status ? `${status} Tasks` : "Tasks"} /> 

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}

      </div>

      {/* tiêu đề (TaskTitle) cho ba trạng thái công việc (To Do, In Progress, và Completed) khi không có status cụ thể được chọn */}
      <Tabs tabs={TABS} setSelected={setSelected}>

        {!status && ( //Nếu status là null, undefined, hoặc giá trị không hợp lệ, phần này của giao diện sẽ được hiển thị.
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            
            {/* lấy màu của todo  */}
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />

              {/* màu của in prog  */}
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />

            {/* màu của comple  */}
            <TaskTitle label='completed' className={TASK_TYPE.completed} />
          
          </div>
        )}

        
        {selected !== 1 ? ( // đây là điều kiện để xem xem dạng bảng hay xem dạng list
          // 
          <BoardView tasks={tasks} />

        ) : (
          <div className='w-full'>
            <Table tasks={tasks} />
          </div>
        )}

      </Tabs>

      {/* componet sử dụng để xử lý nut thêm task trong task  */}
      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;

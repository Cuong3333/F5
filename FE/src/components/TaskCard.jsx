import clsx from "clsx";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// tiện ích
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
// compoment cha
import UserInfo from "./UserInfo";
// component trong task
import TaskDialog from "./task/TaskDialog";
import AddSubTask from "./task/AddSubTask";

// icon
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth); // vào store redux lấy thông tin người dùng
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              // màu cho mức độ ưu tiên
              PRIOTITYSTYELS[task?.priority]
            )}
          >
            {/*Lấy mức độ ưu tiên trong api fake - dựa trên mức độ ưu tiên hiển thị icon đã setup*/}
            <span className='text-lg'>{ICONS[task?.priority]}</span>
            {/* viêt hóa tên mức độ ưu tiên trong api faker  */}
            <span className='uppercase'>{task?.priority} Priority</span>
          </div>
          
          {/* thông tin người dung sem có phải là admin không phải thì sử dụng TaskDialog */}
          {user?.isAdmin && <TaskDialog task={task} />}
          
        </div>

        <>
          <div className='flex items-center gap-2'>
            <div
            // đi vào tiện ích lấy hàm xử lý màu nền và đi vào api fake lấy loại nhiệm vụ
            // sau đó dựa theo loại nhiệm vụ để hiển thị màu sắc 
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            {/* đi vào api fake lấy tên để hiện thị */}
            <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
          </div>
          <span className='text-sm text-gray-600'>
          {/* chuyển đổi một ngày như 2024-11-07T15:30:00Z thành định dạng dễ đọc như 07/11/2024 hoặc November 7, 2024. */}
            {formatDate(new Date(task?.date))} 
          </span>
        </>

        <div className='w-full border-t border-gray-200 my-2' />

        <div className='flex items-center justify-between mb-2'>
          {/* đôi diện với team */}
          <div className='flex items-center gap-3'>
            <div className='flex gap-1 items-center text-sm text-gray-600'>
              <BiMessageAltDetail />
              {/* api vai trò hiển thị số lượng hoạt động (activities) của một nhiệm vụ (task) */}
              <span>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-600 '>
              <MdAttachFile />
              {/* api */}
              <span>{task?.assets?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-600 '>
              <FaList />
              {/* api */}
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          {/* Sử lý team trong nhiệm vụ */}
          <div className='flex flex-row-reverse'>
            {task?.team?.map((m, index) => (
              <div
                key={index}
                //Dòng mã này giúp phần tử có nền màu thay đổi tùy theo chỉ số index, và các màu này được lấy từ mảng BGS. Nếu mảng BGS có 3 màu, index % 3 sẽ trả về các chỉ số 0, 1 hoặc 2, giúp chọn màu nền khác nhau từ mảng.
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                {/* components  */}
                <UserInfo user={m} />
              </div>
            ))}
          </div>
          
        </div>

        {/* sub tasks */}
        {task?.subTasks?.length > 0 ? ( // nếu nhiệm vụ phụ lớn hơn 0 thì thực hiện
          <div className='py-4 border-t border-gray-200'>
            <h5 className='text-base line-clamp-1 text-black'>
              {/* hiển thị tên của nhiệm vụ phụ trong nhiệm vu */}
              {task?.subTasks[0].title}
            </h5>

            <div className='p-4 space-x-8'>
              <span className='text-sm text-gray-600'>
                {/* hiển thị ngày của nhiệm vụ phụ */}
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className='bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium'>
                {/* hiển thị tag trong nhiệm vụ phụ */}
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : ( // không có sub nhiệm vụ nào
          <>
            <div className='py-4 border-t border-gray-200'>
              <span className='text-gray-500'>No Sub Task</span>
            </div>
          </>
        )}


        {/* thêm sub task dành cho admin  */}
        <div className='w-full pb-2'>
          <button
            onClick={() => setOpen(true)} //khi click đặt trạng thái của open thành true
            disabled={user.isAdmin ? false : true} //điều kiện kích hoạt đảm bảo rằng button chỉ có thể được nhấn nếu người dùng có quyền quản trị (isAdmin).
            // khi vô hiệu hóa thì (disabled), sẽ có một lớp CSS được áp dụng, thay đổi con trỏ chuột thành not-allowed và thay đổi màu sắc của button (text-gray-300).
            className='w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300'
          >
            <IoMdAdd className='text-lg' />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;

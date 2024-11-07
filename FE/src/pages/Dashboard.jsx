import React from "react";
import moment from "moment"; // thư viện ngày tháng
import { summary } from "../assets/data"; // giả lập api
import clsx from "clsx"; // viết logic trong class

// components
import { Chart } from "../components/Chart"; // sử dụng biểu đồ
import UserInfo from "../components/UserInfo";

// tiện ích
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";

//icon
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

//Hiển thị bảng icon các nhiệm vụ với các cột như tiêu đề nhiệm vụ, độ ưu tiên, đội ngũ và ngày tạo.
const TaskTable = ({ tasks }) => {

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  // TableHeader là một component React có tác dụng hiển thị phần tiêu đề của một bảng (table header). Đây là phần tiêu đề mà người dùng sẽ thấy khi xem bảng chứa các thông tin về nhiệm vụ (tasks)
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2'>Team</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  //TableRow, được sử dụng để hiển thị từng hàng dữ liệu (row) trong bảng. Mỗi hàng đại diện cho một nhiệm vụ (task) và các thông tin liên quan đến nhiệm vụ đó
  const TableRow = ({ task }) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      
      {/* cột 1 css cho tên nhiệm vụ */}
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} // màu cho kiểu nhiệm vụ
          />
            {/* tên nhiệm vụ */}
          <p className='text-base text-black'>{task.title}</p> 
        </div>
      </td>

      {/* Cột thứ hai - Mức độ ưu tiên */}
      <td className='py-2'>
        <div className='flex gap-1 items-center'>
          {/*PRIOTITYSTYELS Màu cho mức độ ưu tiên */}
          <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}> 
            {/* icon cho mức độ ưu tiên */}
            {ICONS[task.priority]} 
          </span>
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      {/* Cột thứ ba - Nhóm làm việc */}
      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS.length] //BGS là một mảng các lớp màu (background color), và index % BGS.length đảm bảo rằng màu sắc được lặp lại nếu số thành viên nhiều hơn số màu trong mảng BGS
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      {/* Cột thứ tư - Ngày tạo nhiệm vụ */}
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
        {/* hiển thị phần tiêu đề của một bảng */}
          <TableHeader />

          <tbody>
            {/* hiện thị dữ liệu cho bảng */}
            {tasks?.map((task, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable = ({ users }) => {
  
  // Hiển thị danh sách người dùng với thông tin như tên đầy đủ, trạng thái (active/disabled) và ngày tạo tài khoản.
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );
 
  // TableRow trong React để hiển thị thông tin của một người dùng trong một bảng.
  const TableRow = ({ user }) => (
    <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
      
      {/* cột đầu tiên trong bảng user - tên user và vai trò */}
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            {/* lấy chữ cái đầu tiên của tên người dung */}
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      {/* cột thứ 2 - activate & ngày tạo*/}
      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  return (
    <div className='w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded'>
      <table className='w-full mb-5'>
        {/* tiêu đề cho nhiệm vụ */}
        <TableHeader /> 
        <tbody>
          {users?.map((user, index) => (
            //TableRow, được sử dụng để hiển thị từng hàng dữ liệu (row) trong bảng. Mỗi hàng đại diện cho một nhiệm vụ (task) và các thông tin liên quan đến nhiệm vụ đó
            <TableRow key={index + user?._id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  
  // thành phần chính chứa các thẻ thống kê (cards) hiển thị tổng số nhiệm vụ, nhiệm vụ hoàn thành, nhiệm vụ đang thực hiện, và các công việc cần làm (todos).
  // vào file data lấy api giả của tasks
  const totals = summary.tasks;

  // lẩy ra tổng nhiệm vụ và thông tin cần thiết cho top dashboard
  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0, // lấy tổng nhiệm vụ trong file data
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0, // tổng nhiệm vụ hoàn thành
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0, // tổng nhiệm vụ đang làm
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0, // tổng nhiệm vụ của mình
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  // phần trên của dashboard
  //Component Card trong React được sử dụng để hiển thị một thẻ thông tin tổng hợp về các chỉ số hoặc số liệu thống kê
  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"110 last month"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className='h-full py-4'>

      {/* phần top của dashboard */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => ( //Render danh sách các thẻ Card một cách tự động dựa theo mảng stats đã cho
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* Phần biểu đồ của Dashboard */}
      <div className='w-full bg-white my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Chart by Priority
        </h4>
        {/* sử dụng component biểu đồ ở đây */}
        <Chart />
      </div>

      {/* Phần dưới của dashboard */}
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        
        {/*bên dưới phía /left */}
        <TaskTable tasks={summary.last10Task} />

        {/*bên dưới phía /right */}
        <UserTable users={summary.users} />
      </div>
    </div>
  );
};

export default Dashboard;

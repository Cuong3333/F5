import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

// install react-icon
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { 
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { SiRobotframework } from "react-icons/si";

// link slidebar dùng để cho phép phân quyền
const linkData = [
  {
    label: "Chat",
    link: "chatbot",
    icon: <SiRobotframework />,
  },
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {

  //kiểm tra trạng thái người dùng
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  //Nếu bạn đang ở trang "/dashboard/tasks", giá trị của path sẽ là "dashboard". Phần path này được dùng để xác định trang hiện tại của người dùng, giúp xác định link nào trong sidebar đang được chọn để có thể làm nổi bật hoặc áp dụng các class CSS tương ứng cho giao diện.
  const path = location.pathname.split("/")[1];

  // xác định user có phải admin hay không nếu có thì toàn quyền, nếu không thì chi sử dụng đc 5 phần từ đầu trong linkdata
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);

  // gọi đến redux store để gửi đi hành động đóng slidebar
  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#3a582b2d]",
          path === el.link.split("/")[0] ? "bg-green-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className='hover:text-[#32CD32]'>{el.label}</span>
      </Link>
    );
  };

  return (
    <div className='w-full  h-full flex flex-col gap-6 p-5'>
      <h1 className='flex gap-1 items-center'>
        <p className='bg-green-600 p-2 rounded-full'>
          <MdOutlineAddTask className='text-white text-2xl font-black' />
        </p>
        <span className='text-2xl font-bold text-black'>TaskMe</span>
      </h1>

      <div className='flex-1 flex flex-col gap-y-5 py-8'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div className=''>
        <button className='w-full flex gap-2 p-2 items-center text-lg text-gray-800'>
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

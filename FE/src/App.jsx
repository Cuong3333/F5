import { Transition } from "@headlessui/react"; 
import clsx from "clsx"; // viết logic cho class
import { Toaster } from "sonner";
import { Fragment, useRef } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"; // sử dụng để đi vào store lấy trạng thái xác thực thông tin người dùng
//pages
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Tasks from './pages/Task';
import Trash from './pages/Trash';
// import TaskDetails from "./pages/TaskDetails";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HealthInfo from "./pages/HealthInfo";
import ChatBot from "./pages/ChatBot";

//components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
//icons
import { IoClose } from "react-icons/io5";

//store
import { setOpenSidebar } from "./redux/slices/authSlice";



// layoout cho trang khi đăng nhập thành công
function Layout() {

  // hook từ redux truy cập vào trạng thái redux store bên trong 1 compoent ko phải sử dụng pops
  //  đang truy cập vào phần auth trong Redux store. Đây có thể là một reducer hoặc một phần của trạng thái trong store, nơi thông tin liên quan đến quá trình xác thực (như thông tin người dùng, trạng thái đăng nhập, token, v.v.) được lưu trữ.
  //giúp bạn lấy thông tin người dùng từ phần auth trong trạng thái Redux store. Sau khi thực thi, user sẽ chứa thông tin người dùng nếu có (chẳng hạn như khi người dùng đã đăng nhập).
  //Câu lệnh này rất hữu ích để kiểm tra trạng thái đăng nhập của người dùng, ví dụ như chuyển hướng người dùng đến trang dashboard nếu họ đã đăng nhập thành công.
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        {/* thanh điều hướng bên trái */}
        <Sidebar /> 
      </div>

        {/* slideBar Trên điện thoại reponsive */}
      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          {/* khu vực nhỏ để điều hướng trong components lồng nhau */}
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}


// cấu hình cho màn hình điện tho
const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false)); // Đảm bảo setOpenSidebar đã được định nghĩa trong Redux actions
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition ease-in-out duration-1500 transform" // Thời gian hiệu ứng khi mở sidebar (1.5 giây)
        enterFrom="opacity-x-10" // Sidebar vào từ bên trái
        enterTo="opacity-x-100" // Sidebar dừng lại ở vị trí trong màn hình
        leave="transition-opacity ease-in-out duration-700" // Thời gian hiệu ứng khi đóng sidebar (1.5 giây)
        leaveFrom="opacity-x-100" // Sidebar bắt đầu từ vị trí hiện tại (trong màn hình)
        leaveTo="opacity-x-0" // Sidebar di chuyển ra ngoài màn hình từ bên phải
      >
        {(ref) => (
          <div
            ref={mobileMenuRef}
            className={clsx(
              'md:hidden w-full h-full bg-black/10 absolute top-0 left-0 z-50', // Sử dụng absolute để đảm bảo nó phủ lên toàn bộ màn hình
              isSidebarOpen ? 'block' : 'hidden'
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-[50%] h-full rounded-[8px] transform transition-all duration-700">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6] '>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/chatbot' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/chatbot' element={<ChatBot />} />
        </Route>

        <Route path='/log-in' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/healthInfo' element={<HealthInfo />} />
        <Route path='/home' element={<Home />} />

      </Routes>

      {/* thư viện để thông báo toàn trang web */}
      <Toaster richColors />
    </main>
  );
}

export default App

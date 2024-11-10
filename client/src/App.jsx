import React from "react";
import { Transition } from "@headlessui/react"; 
import clsx from "clsx";
import { Toaster } from "sonner";
import { Fragment, useRef } from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Task";
import Trash from "./pages/Trash";
import TaskDetails from "./pages/TaskDetails";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HealthInfo from "./pages/HealthInfo";
import ChatBot from "./pages/ChatBot";
import Community from "./pages/Community"; // Thêm import Community
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { IoClose } from "react-icons/io5";
import { setOpenSidebar } from "./redux/slices/authSlice";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition ease-in-out duration-1500 transform"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity ease-in-out duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={mobileMenuRef}
            className={clsx(
              "md:hidden w-full h-full bg-black/10 absolute top-0 left-0 z-50",
              isSidebarOpen ? "block" : "hidden"
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
    <main className="w-full min-h-screen bg-[#f3f4f6] ">
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/chatbot" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/community" element={<Community />} /> {/* Thêm Route Community */}
        </Route>

        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/healthInfo" element={<HealthInfo />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;

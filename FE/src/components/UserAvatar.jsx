// hiển thị menu người dùng với các tùy chọn như "Profile", "Change Password", và "Logout"
import { Menu, Transition } from "@headlessui/react"; // install react-headlessui.tạo ra một menu thả xuống
import { Fragment, useState } from "react"; // Fragment không muốn bao quanh mỗi bài viết bằng các thẻ DOM phụ (như <div>, <section>), mà chỉ muốn nhóm các phần tử lại với nhau để hiển thị
import { useDispatch, useSelector } from "react-redux"; // gửi action cho store và lấy dữ liệu từ store
import { useNavigate } from "react-router-dom";
import { getInitials } from "../utils"; // sử lý tên người dùng
//icons
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const UserAvatar = () => {
  // kiểm tra trạng thái
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  // xác thực người dùng redux
  const { user } = useSelector((state) => state.auth);
  //gửi action tới store để xử lý
  const dispatch = useDispatch();
  // điều hướng
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout()); // Action logout cần được định nghĩa
    navigate('/login'); // Điều hướng đến trang đăng nhập
  };

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
              <span className='text-white font-semibold'>
                {/* Hiển thị chữ cái đầu của tên người dùng */}
                {getInitials(user?.name)}
              </span>
            </Menu.Button>
          </div>

          <Transition //thực hiện hiệu ứng chuyển tiếp khi menu được mở hoặc đóng
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
              
              <div className='p-4'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                    >
                      <FaUser className='mr-2' aria-hidden='true' /> {/*aria-hidden='true'cải thiện khả năng truy cập cho người dùng sử dụng màn hình đọc. */}
                      Profile
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpenPassword(true)}
                      className={`text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <FaUserLock className='mr-2' aria-hidden='true' />
                      Change Password
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>

            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;

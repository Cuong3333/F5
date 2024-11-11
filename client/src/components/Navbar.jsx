import ConfettiButton from '../components/buttonClick/ButtonClickSnow';
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
// gọi redux xử lý action
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

// api
// import { useGetNotificationQuery } from "../redux/slices/api/userApiSlice";



const Navbar = () => {
  // kiểm tra thông tin trạng thái người dùng
  // const { user } = useSelector((state) => state.auth);
  // sử dụng để gửi action vào store để sử lý
  const dispatch = useDispatch();

  // const {data, error, isLoading } = useGetNotificationQuery();

  // if (isLoading) return <div>Loading...</div>;

  // if (error) return <div>Error loading notifications</div>;

  return (
    <div className='flex justify-between items-center bg-gradient-to-r from-[#c8e2c5] to-[#e7f5e5] px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))} // gửi hành động click để sử lý hành động
          className='text-2xl text-gray-500 block md:hidden'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
          <MdOutlineSearch className='text-gray-500 text-xl' />

          <input
            type='text'
            placeholder='Search....'
            className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
          />
        </div>
      </div>

      <div className='flex gap-2 items-center'>

        <ConfettiButton />


        {/* thông báo người dùng */}
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;

import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
//thong báo;
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet

import { useRegisterMutation } from '../redux/slices/api/authApiSlice'; // Đảm bảo import đúng

import Loading from "../components/Loader";
import { toast } from "sonner";


const Registerr = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation(); // Sử dụng useRegisterMutation


  const submitHandler = async (data) => {
    
    const requestData = { 
      ...data
    };
  
    console.log(requestData)
  
    try {
      const result = await registerUser(requestData).unwrap();
      toast.success("User registered successfully!");
      navigate("/log-in"); // Chuyển hướng sau khi đăng ký thành công
  
    } catch (error) {
      console.error("Error details:", error);
  
      // Hiển thị rõ chi tiết lỗi
      if (error?.data?.detail) {
        error.data.detail.forEach((err) => {
          console.error(`Field: ${err.loc[1]}, Error: ${err.msg}`);
        });
      } else {
        console.error("Unknown error occurred during registration.");
      }
    }
  };
  

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600'>
              Manage all your task in one place!
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-blue-600 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-gray-700 '>
                Keep all your credential safge.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", {
                  required: "Password is required!",
                })}
              error={errors.password ? errors.password.message : ""}
            />

              <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'>
              <Link to="/log-in">Login here</Link>
              </span>

              {isLoading ? (
                <Loading/> // true thì gọi components loading đợi api
              ) : ( // hoàn thành yêu cầu api 
                <Button
                  type='submit'
                  label='Submit'
                  className='w-full h-10 bg-blue-700 text-white rounded-full'
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registerr;

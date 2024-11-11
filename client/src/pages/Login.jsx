import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Textbox from "../components/Textbox";
import Button from "../components/Button";
//thong báo
import { toast } from "sonner";
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet

import { useLoginMutation } from '../redux/slices/api/authApiSlice'; // Đảm bảo import đúng
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";


// icon 
import video from '../assets/imgHome/video_login.mp4';
// css
// import '../css/cssLogin.css';


const Login = () => {

  // hook từ redux truy cập vào trạng thái redux store bên trong 1 compoent ko phải sử dụng pops
  //  đang truy cập vào phần auth trong Redux store. Đây có thể là một reducer hoặc một phần của trạng thái trong store, nơi thông tin liên quan đến quá trình xác thực (như thông tin người dùng, trạng thái đăng nhập, token, v.v.) được lưu trữ.
  //giúp bạn lấy thông tin người dùng từ phần auth trong trạng thái Redux store. Sau khi thực thi, user sẽ chứa thông tin người dùng nếu có (chẳng hạn như khi người dùng đã đăng nhập).
  //Câu lệnh này rất hữu ích để kiểm tra trạng thái đăng nhập của người dùng, ví dụ như chuyển hướng người dùng đến trang dashboard nếu họ đã đăng nhập thành công.
  const { user } = useSelector((state) => state.auth);
  // const user =''


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [login, {isLoading}, error] = useLoginMutation() // isLoading true khi đang yêu cầu api, fase khi hoàn thành yêu cầu api

  const dispatch = useDispatch();

  // sử dụng hook form gọi call back này để xử lý onsubmit
  const submitHandler = async (data) => { // data là dữ liệu người dùng nhập và gửi đi
    const requestData = { // định dạng lại dữ liệu gui đi 
      username: data.email, // vì backend sử dụng OAuth2PasswordRequestForm nên trường phải là username
      password: data.password
    };

    try {
      const result = await login(requestData);  // Gửi request đăng nhập

      
    
      if (result && result.data && result.data.access_token) {
        // Trả về thông tin người dùng và token
        const { access_token, user } = result.data;
    
        // Dispatch action để lưu token và thông tin người dùng vào Redux state
        dispatch(setCredentials({ token: access_token, user }));
    
        // Lưu token và thông tin người dùng vào localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));  // Lưu thông tin người dùng vào localStorage

        toast.success(result?.message || "Login successfully!"); // Kiểm tra nếu có message từ backend

        window.location.reload();
      } else {
        toast.error("Email or password failed");
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
    
  };


  // nếu người dùng đã đăng nhập thì cấp lại quyền truy cấp
  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side */}

        {/* left side */}
        <div className='h-[670px] w-[588.1px] lg:w-2/3 flex flex-col items-center justify-center relative '>
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={video} />
            Your browser does not support the video tag.
          </video>

          <div className='relative w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
            <span className='flex gap-1 py-1 px-3 border rounded-full text-xs md:text-sm border-gray-300 text-[#2e2f2f] bg-[#e5e6e8]'>
              Start Your Health Journey
            </span>
            <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-[#cccdcd]'>
              <span>SignIn &</span>
              <span>Healthier Life</span>
            </p>

            <div className='cell'>
              <div className='circle rotate-in-up-left bg-green-500'></div>  
            </div>


          </div>

            <div className="footerDiv flex justify-between items-center px-4 py-2 bg-white/25 backdrop-blur-sm rounded-lg absolute bottom-[20px] left-[10px] mx-auto w-full max-w-[470px]">
              <span className="text text-white">Don't have an account?</span>
              <Link to={'/register'}>
                <button className="bg-white text-primaryColor py-2 px-6 rounded-lg font-normal transition-all duration-300 transform hover:scale-105 hover:bg-[#68c26e] hover:border-[#b2f7ef] hover:text-black border-2 border-transparent">
                  Sign Up?
                </button>
              </Link>
            </div>

          

        </div>




        {/* right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'
          >
            <div className=''>
              <p className='text-green-800 text-3xl font-bold text-center'>
                Welcome back!
              </p>
              <p className='text-center text-base text-green-500 '>
                Keep all your credential safge.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
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

              <span className='text-sm text-green-800 hover:text-green-400 hover:underline cursor-pointer'>
                <Link to="/register">Forgot password</Link>
              </span>

              {isLoading ? (
                <Loading/> // true thì gọi components loading đợi api
              ) : ( // hoàn thành yêu cầu api 
                <Button
                  type='submit'
                  label='Submit'
                  className='w-full h-10 bg-green-500 text-white rounded-full'
                />
              )}
              
              
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

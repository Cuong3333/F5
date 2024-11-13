import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { toast } from "sonner"; // Toast thông báo
import 'react-toastify/dist/ReactToastify.css'; // Import stylesheet
import { useLoginMutation } from '../redux/slices/api/authApiSlice'; // API call hook
import { setCredentials } from "../redux/slices/authSlice"; // Redux action để lưu thông tin user
import Loading from "../components/Loader"; // Component loading

// Video icon
import video from '../assets/imgHome/video_login.mp4';

const Login = () => {
  const { user } = useSelector((state) => state.auth); // Lấy thông tin người dùng từ Redux

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [login, { isLoading }, error] = useLoginMutation(); // Mutation login API
  const dispatch = useDispatch();

  // Submit handler gửi dữ liệu đăng nhập
  const submitHandler = async (data) => {
    const requestData = {
      username: data.email, // Backend yêu cầu 'username' thay vì 'email'
      password: data.password,
    };
  
    try {
      const result = await login(requestData);  // Gửi request đăng nhập
  
      if (result?.data?.access_token) {
        // Lưu thông tin vào Redux và localStorage
        const { access_token, user } = result.data;
        dispatch(setCredentials({ token: access_token, user }));
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
  
        toast.success(result?.message || "Login successfully!");
        
        // Kiểm tra nếu người dùng đã có thông tin trong bảng UserProfile
        if (user.profile && user.profile.name && user.profile.goal) {
          navigate("/chatbot");  // Nếu đã có thông tin, điều hướng đến chatbot
        } else {
          navigate("/UserProfile");  // Nếu chưa có thông tin, điều hướng đến trang UserProfile
        }
  
      } else {
        toast.error("Email or password failed");
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  

  // Nếu người dùng đã đăng nhập, điều hướng đến chatbot
  useEffect(() => {
    if (user) {
      // Kiểm tra nếu người dùng đã có thông tin trong bảng UserProfile
      if (user.profile) {
        navigate("/chatbot");  // Điều hướng đến chatbot nếu có thông tin
      } else {
        navigate("/UserProfile");  // Điều hướng đến trang UserProfile nếu chưa có thông tin
      }
    }
  }, [user, navigate]);
  

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* Left side */}
        <div className='h-[670px] w-[588.1px] lg:w-2/3 flex flex-col items-center justify-center relative'>
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
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

        {/* Right side */}
        <div className='w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
          <form onSubmit={handleSubmit(submitHandler)} className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>
            <p className='text-green-800 text-3xl font-bold text-center'>Welcome back!</p>
            <p className='text-center text-base text-green-500'>Keep all your credentials safe.</p>

            <div className='flex flex-col gap-y-5'>
              <Textbox
                placeholder='email@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-full'
                register={register("email", { required: "Email Address is required!" })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder='your password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-full'
                register={register("password", { required: "Password is required!" })}
                error={errors.password ? errors.password.message : ""}
              />

              <span className='text-sm text-green-800 hover:text-green-400 hover:underline cursor-pointer'>
                <Link to="/register">Forgot password</Link>
              </span>

              {isLoading ? (
                <Loading /> // Hiển thị loading khi đang gửi request
              ) : (
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

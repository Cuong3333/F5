  // src/Components/Login/Login.jsx

  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom'; // import useNavigate
  import './Login.css';
  import { Link } from 'react-router-dom';
  import { login } from '../../services/api';

  import { FaUserShield } from 'react-icons/fa';
  import { BsFillShieldLockFill } from "react-icons/bs";
  import { AiOutlineSwapRight } from "react-icons/ai";

  import video from '../../Assets/video2.mp4';
  import logo from '../../Assets/logo1.png';

  const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Khai báo useNavigate

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const data = await login(username, password);
        console.log(data); // Kiểm tra token trả về từ API
        localStorage.setItem('token', data.access_token); // Lưu token vào localStorage
        navigate('/main'); // Điều hướng đến trang /main sau khi đăng nhập thành công
      } catch (error) {
        setError('Email hoặc mật khẩu không chính xác');
      }
    };
    
    

    return (
      <div className='loginPage flex'>
        <div className="container flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
            <div className="textDiv">
              <h2 className="title">Create Sell Extraordinary Products</h2>
              <p>Adopt The peace of nature!</p>
            </div>
            <div className="footerDiv flex">
              <span className="text">Don't have an account?</span>
              <Link to={'/register'}>
                <button className='btn'>Sign Up</button>
              </Link>
            </div>
          </div>

          <div className='formDiv flex'>
            <div className="headerDiv">
              <img src={logo} alt="logo" />
              <h3>☂Welcome Back✿</h3>
            </div>

            <form onSubmit={handleLogin} className='form grid'>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                  <FaUserShield className='icon'/>
                  <input
                    type="text"
                    id='username'
                    placeholder='Enter Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                  <BsFillShieldLockFill className='icon' />
                  <input
                    type="password"
                    id='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type='submit' className='btn flex'>
                <span>Login</span>
                <AiOutlineSwapRight className='icon'/>
              </button>

            </form>
          </div>
        </div>
      </div>
    );
  };

  export default Login;

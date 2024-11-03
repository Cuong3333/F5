import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { BsFillShieldLockFill } from "react-icons/bs"; // password
import { AiOutlineSwapRight } from "react-icons/ai"; // Register button
import { MdAttachEmail } from "react-icons/md"; // email
import { RiLockPasswordFill } from "react-icons/ri"; // re-password
import video from '../../Assets/video1.mp4';
import logo from '../../Assets/logo1.png';
import { register } from '../../services/api'; // Đảm bảo bạn đã cấu hình hàm đăng ký trong api.js

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(email, password); // Chỉ cần email và password
      navigate('/'); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        
        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>☂Register✿</h3>
          </div>

          {/* Form tương tác */}
          <form onSubmit={handleRegister} className='form grid'>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdAttachEmail className='icon' />
                <input
                  type="text"
                  id='email'
                  placeholder='Enter Email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder='Enter Password...'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="re_password">Re-enter Password</label>
              <div className="input flex">
                <RiLockPasswordFill className='icon' />
                <input
                  type="password"
                  id='re_password'
                  placeholder='Re-enter Password...'
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </div>
            </div>

            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon' />
            </button>
          </form>

        </div>

        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create Sell Extraordinary Products</h2>
            <p>Adopt The peace of nature!</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don't have an account?</span>
            <Link to={'/'}>
              <button className='btn'>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

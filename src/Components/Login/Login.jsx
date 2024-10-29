import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

// import icon react 
//https://react-icons.github.io/react-icons/search/#q=fausershie
import { FaUserShield } from 'react-icons/fa'; // username
import { BsFillShieldLockFill } from "react-icons/bs"; // password
import { AiOutlineSwapRight } from "react-icons/ai"; // login_button


//import our assets 
// video : https://pixabay.com/videos/plant-leaves-foliage-rain-drops-92994/
import video from '../../Assets/video2.mp4'
// img: https://www.pexels.com/vi-vn/
import logo from '../../Assets/logo1.png'

const Login = () => {
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
            <span className="text">Don't have an acount?</span>
            <Link to={'/register'}>
              <button className='btn'>
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="logo" />
            <h3>☂Welcome Back✿</h3>
          </div>

          {/* Form tương tác */}
          <form action="" className='form grid'>
            <span className='showMessage'>Login with wҽᒪᒪᎶгëέëń</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' placeholder='Enter Password' />
              </div>
            </div>
            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href=''>Click Here</a>
            </span>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login
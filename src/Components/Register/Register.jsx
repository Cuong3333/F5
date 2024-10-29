import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

// import icon react 
//https://react-icons.github.io/react-icons/search/#q=fausershie
import { FaUserShield } from 'react-icons/fa'; // username
import { BsFillShieldLockFill } from "react-icons/bs"; // password
import { AiOutlineSwapRight } from "react-icons/ai"; // Register_button
import { MdAttachEmail } from "react-icons/md"; // email
import { RiLockPasswordFill } from "react-icons/ri"; // repasss


//import our assets 
// video : https://pixabay.com/videos/plant-leaves-foliage-rain-drops-92994/
import video from '../../Assets/video1.mp4'
// img: https://www.pexels.com/vi-vn/
import logo from '../../Assets/logo1.png'

const Register = () => {
  return (
    <div className='registerPage flex'>
      <div className="container flex">
        
        <div className='formDiv flex'>
          <div className="headerDiv">
            <img src={logo} alt="Logo" />
            <h3>☂Register✿</h3>
          </div>

          {/* Form tương tác */}
          <form action="" className='form grid'>
            {/* <span className='showMessage'>Register with wҽᒪᒪᎶгëέëń</span> */}
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username...' />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdAttachEmail className='icon'/>
                <input type="text" id='email' placeholder='Enter Email...' />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon' />
                <input type="password" id='password' placeholder='Enter Password...' />
              </div>
            </div>

            {/* <div className="inputDiv">
              <label htmlFor="re_password">Re-enter password</label>
              <div className="input flex">
                <RiLockPasswordFill className='icon' />
                <input type="password" id='re_password' placeholder='Re-enter password...' />
              </div>
            </div> */}
            <button type='submit' className='btn flex'>
              <span>Register</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='haveAcc'>
              Already have an account? <a href=''>Signin Here</a>
            </span>
          </form>

        </div>

        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>
          <div className="textDiv">
            <h2 className="title">Create Sell Extraordinary Products</h2>
            <p>Adopt The peace of nature!</p>
          </div>
          <div className="footerDiv flex">
            <span className="text">Don't have an acount?</span>
            <Link to={'/'}>
              <button className='btn'>
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
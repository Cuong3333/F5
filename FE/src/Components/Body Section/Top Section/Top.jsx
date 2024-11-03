import React from 'react'
import './Top.css'

// import Image, video
import img from '../../../Assets/user3.png'
import img1 from '../../../Assets/img1.png'
import video from '../../../Assets/video_main1.mp4'

// icon 
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from 'react-icons/tb';
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsArrowRightShort } from 'react-icons/bs';
import { BsQuestionOctagon } from "react-icons/bs";

const Top = () => {
  return (
    <div className="topSection">
      <div className="headerSection flex">
        <div className="title">
          <h1>Welcome to WellGreeen.</h1>
          <p>Hello dao van san g, well comback</p>
        </div>

        <div className="searchBar flex">
          <input type="text" placeholder='Search...' />
          <BiSearchAlt className="icon"/>
        </div>

        <div className="userDiv flex">
          <TbMessageCircle className='icon'/>
          <IoIosNotificationsOutline className='icon'/>

          <div className="userImage">
            <img src={img} alt="User img" />
          </div>
        </div>
      </div>

      <div className="cardSection flex">
        <div className="rightCard flex">
          {/* <h1>Ceate and sell ...</h1>
          <p>The world ...</p>

          <div className="buttons flex">
            <button className='btn'>Explore More</button>
            <button className='btn transparent'>Top Seller</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay loop muted></video>
          </div> */}
        </div>

        <div className="leftCard flex">
          <div className="main flex">

            <div className="textDiv">
              <h1>My Start</h1>

              <div className="flex">
                <span>
                  Today <br/> <small>4 Oders</small>
                </span>

                <span>
                  This Month <br/> <small>12 Oders</small>
                </span>
              </div>

              <div className="flex link">
                Go to my orders 
                <BsArrowRightShort className='icon'/>
              </div>
            </div>

            <div className="imgDiv">
              <img src={img1} alt="img" />
            </div>

            {/* We shall use this card Later */}
                  {/* Sidebar Card */}
            {/* <div className="sideBarCard">
              <BsQuestionOctagon className="icon"/>
              <div className="cardContent">
                <div className="circle1"></div>
                <div className="circle2"></div>
                <h3>Help Center</h3>
                <p>Connect us from for more question.</p>
                <button className="btn">Go to help center</button>
              </div>
            </div> */}

          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Top
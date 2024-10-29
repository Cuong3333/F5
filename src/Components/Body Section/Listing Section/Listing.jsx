import React from 'react'
import './Listing.css'

// import img
// import img1 from '../../../Assets/img4.png'

// import icon
import { FaRobot } from "react-icons/fa";
import { GrSend } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";

// import { BsArrowRightShort } from "react-icons/bs";
// import { AiFillHeart } from 'react-icons/ai';

const Listing = () => {

  return (
    <div className="listingSection show-chatbot">

      <button className="chatbot-toggler">
        <BsRobot className='icon-toggle iconChatbotToggler-chat'/>
        <RiCloseCircleFill className='icon-toggle iconChatbotToggler-close'/>
      </button>

        <div className="chatbot">
          <header>
            <h2>Chatbot</h2>
          </header>

          <ul className="chatbox">
            <li className="chat incoming">
              <FaRobot className='icon'/>
              <p>Hi there <br/> How can I help you today?</p>
            </li>

            <li className="chat outgoing">
              <p>i am is sang</p>
            </li>
          </ul>

          <div className="chat-input">
            <textarea placeholder='Enter a message...' required></textarea>
            <GrSend className='icon iconSend'/>
          </div>

      </div>

      {/* <div className="heading flex">
        <h1>My Listing</h1>
        <button className='btn flex'>
          See All
          <BsArrowRightShort className='icon'/>
        </button>
      </div> */}

        {/* item.. */}
      {/* <div className="secContainer flex">
        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img1} alt="img" />
          <h3>sang</h3>
        </div>

        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img1} alt="img" />
          <h3>sang</h3>
        </div>

        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img1} alt="img" />
          <h3>sang</h3>
        </div>

        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img1} alt="img" />
          <h3>sang</h3>
        </div>
      </div> */}

      {/* Top sellll */}
      {/* <div className="sellers flex">
        <div className="topSellers">
          <div className="heading flex">
            <h3>Top Sellers</h3>
            <button className='btn flex'>
              See All
              <BsArrowRightShort className='icon'/>
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={img1} alt="User" />
              <img src={img1} alt="User" />
              <img src={img1} alt="User" />
              <img src={img1} alt="User" />
            </div>

            <div className="cardText">
              <span>
                14.555 Plant sold <br/>
                <small>
                  21 Sellers <span className="date">7 days</span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>featured Sellers</h3>
            <button className='btn flex'>
              See All
              <BsArrowRightShort className='icon'/>
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={img1} alt="User" />
              <img src={img1} alt="User" />
              <img src={img1} alt="User" />
              <img src={img1} alt="User" />
            </div>

            <div className="cardText">
              <span>
                28,555 Plant sold <br/>
                <small>
                  26 Sellers <span className="date">31 days</span>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div> */}
      
    </div>
  )
}

export default Listing
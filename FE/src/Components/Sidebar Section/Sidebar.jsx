import React from "react";
import { Link } from 'react-router-dom'; // Import Link
import "./Sidebar.css";
import logo from '../../Assets/logo.png'

// icon menu
import { IoMdSpeedometer } from "react-icons/io";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { BsTrophy } from "react-icons/bs";

// icon setting
import { AiOutlinePieChart } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";

// icon question sidebar
import { BsQuestionOctagon } from "react-icons/bs";
import { AiOutlineHistory } from "react-icons/ai"; // Icon cho mục History

const Sidebar = () => {
  return (
    <div className="sideBar grid">
      <div className="logoDiv flex">
        <img src={logo} alt="" />
        <h2>Planti.</h2>
      </div>

      {/* MenuDiv1 */}
      <div className="menuDiv">
        <h3 className="divTitle">QUICK MENU</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <Link to="/main" className="menuLink flex">
              <IoMdSpeedometer className="icon"/>
              <span className="smallText">Dashboard</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/orders" className="menuLink flex">
              <MdDeliveryDining className="icon"/>
              <span className="smallText">My Order</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/explore" className="menuLink flex">
              <MdOutlineExplore className="icon"/>
              <span className="smallText">Explore</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/products" className="menuLink flex">
              <BsTrophy className="icon"/>
              <span className="smallText">Products</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Setting div2 */}
      <div className="settingsDiv">
        <h3 className="divTitle">SETTING</h3>
        <ul className="menuLists grid">
          <li className="listItem">
            <Link to="/charts" className="menuLink flex">
              <AiOutlinePieChart className="icon"/>
              <span className="smallText">Charts</span>
            </Link>
          </li>

          <li className="listItem">
            <Link to="/billing" className="menuLink flex">
              <BsCreditCard2Front className="icon"/>
              <span className="smallText">Billing</span>
            </Link>
          </li>

          {/* New History Section */}
          <li className="listItem">
            <Link to="/history" className="menuLink flex">
              <AiOutlineHistory className="icon"/> {/* Icon for history */}
              <span className="smallText">History</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Card */}
      <div className="sideBarCard">
        <BsQuestionOctagon className="icon"/>
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <h3>Help Center</h3>
          <p>Connect us from for more question.</p>
          <button className="btn">Go to help center</button>
        </div>
      </div>
    </div>
  )
};

export default Sidebar;

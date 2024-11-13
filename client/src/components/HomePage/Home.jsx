import React from "react";
import { Link } from "react-router-dom";
import BannerBackground from "../../Assets/home-banner-background.png";
import BannerImage from "../../Assets/gif-unscreen.gif";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Healthy Life
          </h1>
          <p className="primary-text">
          Supporting users in building a healthy and sustainable lifestyle with personalized suggestions on nutrition, exercise, and green living habits.
          </p>
          <Link to="/log-in">
              <button className="secondary-button">
                  Get Start <FiArrowRight />
              </button>
          </Link>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;

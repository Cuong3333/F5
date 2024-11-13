// src/Pages/HomePage.jsx

import React from "react";
import "../css/HomePage.css"; // Import CSS thường
import Home from "../components/HomePage/Home";
import About from "../components/HomePage/About";
// import Work from "../Components/HomePage/Work";
import Footer from "../components/HomePage/Footer";

function HomePage() {
  return (
    <div className="App"> {/* Sử dụng CSS thường */}
      <Home />
      <About />
      {/* <Work /> */}
      <Footer />
    </div>
  );
}

export default HomePage;


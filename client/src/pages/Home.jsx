import React from "react";
import '../css/Home.css'
import useSlide from '../utils/useSlide';
// import ảnh
// Import ảnh từ thư mục assets
import img1 from '../assets/imgHome/img1.webp';
import img2 from '../assets/imgHome/img2.jpg';
import img3 from '../assets/imgHome/img3.jpg';

const Home = () => {

    useSlide();

    const slides = [
        {
          name: "Switzerlane",
          description: "Lorem ipsum dolor sit amet.",
          img: img1
        },
        {
          name: "Finland",
          description: "Lorem ipsum dolor sit amet.",
          img: img2
        },
        {
          name: "Iceland",
          description: "Lorem ipsum dolor sit amet.",
          img: img3
        },
        {
          name: "Australia",
          description: "Lorem ipsum dolor sit amet.",
          img: img2
        },
        {
          name: "Netherland",
          description: "Lorem ipsum dolor sit amet.",
          img: img3
        },
        {
          name: "Ireland",
          description: "Lorem ipsum dolor sit amet.",
          img: img2
        },
        {
            name: "Ireland",
            description: "Lorem ipsum dolor sit amet.",
            img: img2
        },
        {
            name: "Ireland",
            description: "Lorem ipsum dolor sit amet.",
            img: img2
        }
      ];
    
      return (
        <div className="container--home">
          <div className="slide">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="item"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="content--home">
                  <div className="name">{slide.name}</div>
                  <div className="des">{slide.description}</div>
                  <button>See More</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="button--home">
            <button className="prev">trai</button>
            <button className="next">phai</button>
          </div>
        </div>
      );
}

export default Home
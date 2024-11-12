import '../../css/cssDecoTree.css'
import img from '../../assets/imgHome/img_deco.png'
import { BsArrowRightShort } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';

const Tree = () => {
  const [currentDate, setCurrentDate] = useState('');

  // Hàm để lấy ngày hiện tại và định dạng
  const getCurrentDate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('vi-VN', {
      weekday: 'long', // Hiển thị thứ
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);
  };

  // Sử dụng useEffect để cập nhật thời gian khi component được render
  useEffect(() => {
    getCurrentDate();
  }, []);

  return (
    <div className="topSection">
      <div className="cardSection flex">
        <div className="leftCard flex">
          <div className="main flex">

            <div className="textDiv">
              <h1>My Start</h1>
              <div className="flex">
                <span>
                  Today <br /> <small>{currentDate}</small>
                </span>
                <span>
                  Total<br /> <small>results</small>
                </span>
              </div>
              <div style={{color: "#4CAF50"}} className="flex link ">
                Go to my menu 
                <BsArrowRightShort className='icon'/>
              </div>
            </div>
            <div className="imgDiv">
              <img src={img} alt="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tree;

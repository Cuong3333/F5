import React from 'react';
import styles from './Button.module.css';

// Component Button nhận các props: text (nội dung nút), onClick (hàm xử lý sự kiện khi bấm),
// type (loại nút: button, submit, reset), và className (kiểu CSS bổ sung nếu cần)
const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`} // Kết hợp kiểu CSS mặc định và kiểu bổ sung
    >
      {text} {/* Hiển thị nội dung nút */}
    </button>
  );
};

export default Button;

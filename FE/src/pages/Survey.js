import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import QuestionBox from '../components/QuestionBox';
import Options from '../components/Options';
import styles from '../styles/Survey.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';
import avatarImage from '../assets/avatar.webp'; // Path to the image
import youtubeIcon from '../assets/icon/YouTube.jpg';

const questions = [
  {
    question: "Bạn biết tới WellGreen từ đâu?",
    options: [
      { text: "YouTube", icon: youtubeIcon },
      { text: "TV", icon: "/path/to/tv-icon.png" },
      { text: "Bạn bè/gia đình", icon: "/path/to/friends-icon.png" },
      { text: "Tìm kiếm Google", icon: "/path/to/google-icon.png" },
      { text: "Tin tức/báo chí/blog", icon: "/path/to/news-icon.png" },
      { text: "TikTok", icon: "/path/to/tiktok-icon.png" },
      { text: "Facebook/Instagram", icon: "/path/to/facebook-icon.png" },
      { text: "Khác", icon: "/path/to/other-icon.png" }
    ]
  },
  {
    options: [
      { text: "YouTube1", icon: youtubeIcon },
      { text: "TV", icon: "/path/to/tv-icon.png" },
      { text: "Bạn bè/gia đình", icon: "/path/to/friends-icon.png" },
      { text: "Tìm kiếm Google", icon: "/path/to/google-icon.png" },
      { text: "Tin tức/báo chí/blog", icon: "/path/to/news-icon.png" },
      { text: "TikTok", icon: "/path/to/tiktok-icon.png" },
      { text: "Facebook/Instagram", icon: "/path/to/facebook-icon.png" },
      { text: "Khác", icon: "/path/to/other-icon.png" }
    ]
  },
  {
    question: "Câu hỏi tiếp theo?",
    options: [
      { text: "YouTube2", icon: youtubeIcon },
      { text: "TV", icon: "/path/to/tv-icon.png" },
      { text: "Bạn bè/gia đình", icon: "/path/to/friends-icon.png" },
      { text: "Tìm kiếm Google", icon: "/path/to/google-icon.png" },
      { text: "Tin tức/báo chí/blog", icon: "/path/to/news-icon.png" },
      { text: "TikTok", icon: "/path/to/tiktok-icon.png" },
      { text: "Facebook/Instagram", icon: "/path/to/facebook-icon.png" },
      { text: "Khác", icon: "/path/to/other-icon.png" }
    ]
  },
  {
    question: "Câu hỏi tiếp theo?",
    options: [
      { text: "YouTube3", icon: youtubeIcon },
      { text: "TV", icon: "/path/to/tv-icon.png" },
      { text: "Bạn bè/gia đình", icon: "/path/to/friends-icon.png" },
      { text: "Tìm kiếm Google", icon: "/path/to/google-icon.png" },
      { text: "Tin tức/báo chí/blog", icon: "/path/to/news-icon.png" },
      { text: "TikTok", icon: "/path/to/tiktok-icon.png" },
      { text: "Facebook/Instagram", icon: "/path/to/facebook-icon.png" },
      { text: "Khác", icon: "/path/to/other-icon.png" }
    ]
  }
];

const Survey = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Khởi tạo chỉ số câu hỏi
  const [selectedOption, setSelectedOption] = useState(null); // Trạng thái cho lựa chọn được chọn

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Chuyển đến câu hỏi tiếp theo
      setSelectedOption(null); // Reset lựa chọn đã chọn cho câu hỏi tiếp theo
    } else {
      navigate('/Main'); // Chuyển hướng đến trang Home nếu đã hoàn thành
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Quay lại câu hỏi trước
      setSelectedOption(null); // Reset lựa chọn để người dùng có thể chọn lại
    }
  };

  return (
    <div className={styles.surveyContainer}>
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      <img src={avatarImage} alt="Avatar" className={styles.avatar} />
      <QuestionBox question={questions[currentQuestionIndex].question} />
      <Options 
        options={questions[currentQuestionIndex].options} 
        selectedOption={selectedOption} // Gửi lựa chọn đã chọn đến Options
        setSelectedOption={setSelectedOption} // Hàm để cập nhật lựa chọn
      />
      <div className={styles.buttonContainer}>
        {currentQuestionIndex > 0 && (
          <button 
            className={styles.backButton} 
            onClick={handleBack}
          >
            BACK
          </button>
        )}
        <button 
          className={styles.continueButton} 
          onClick={handleNext} 
          disabled={selectedOption === null} // Disable nút nếu không có lựa chọn
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Survey;



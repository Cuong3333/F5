import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../styles/Hero.module.css';

const Hero = () => {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleLoginClick = () => {
    navigate('/LoginPage'); // Chuyển hướng đến trang login
  };

  return (
    <section className={styles.hero}>
      <h1>Welcome to WellGreen</h1>
      <p>Your personalized health assistant powered by AI.</p>
      <button className={styles.getStartedButton}>Get Started</button>
      <button className={styles.loginButton} onClick={handleLoginClick}>Login</button> {/* Nút Login */}
    </section>
  );
};

export default Hero;

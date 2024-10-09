// components/LoginPage.js
import React, { useState } from 'react';
import Login from '../components_big/Login';
import Signup from '../components_big/Signup';
import styles from '../styles/LoginSignup.module.css'; // Import file CSS module


const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // State để theo dõi đang hiển thị login hay signup

  // Hàm để chuyển đổi giữa login và signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={styles.loginSignupContainer}> {/* Sử dụng styles.loginSignupContainer */}
      <div className={styles.formContainer}> {/* Sử dụng styles.formContainer */}
        {isLogin ? (
          <Login toggleForm={toggleForm} /> // Hiển thị component Login
        ) : (
          <Signup toggleForm={toggleForm} /> // Hiển thị component Signup
        )}
      </div>
    </div>
  );
};

export default LoginPage;

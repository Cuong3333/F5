// components/Login.js
import React from 'react';
import styles from '../styles/LoginSignup.module.css'; // Import file CSS module

const Login = ({ toggleForm }) => {
  return (
    <div className={styles.loginSignupContainer}> {/* Sử dụng styles.loginSignupContainer */}
      <div className={styles.formContainer}> {/* Sử dụng styles.formContainer */}
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className={styles.submitButton}> {/* Sử dụng styles.submitButton */}
            Login
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <span onClick={toggleForm} className={styles.toggleLink}> {/* Sử dụng styles.toggleLink */}
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

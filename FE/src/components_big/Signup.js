// components/Signup.js
import React from 'react';
import styles from '../styles/LoginSignup.module.css'; // Import file CSS module

const Signup = ({ toggleForm }) => {
  return (
    <div className={styles.loginSignupContainer}> {/* Sử dụng styles.loginSignupContainer */}
      <div className={styles.formContainer}> {/* Sử dụng styles.formContainer */}
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className={styles.submitButton}> {/* Sử dụng styles.submitButton */}
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{' '}
          <span onClick={toggleForm} className={styles.toggleLink}> {/* Sử dụng styles.toggleLink */}
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

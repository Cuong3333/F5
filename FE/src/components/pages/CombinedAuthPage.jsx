import React, { useState } from 'react';
import { LoginForm, SignupForm } from '../organisms/index';
import styles from './CombinedAuthPage.module.css';

const CombinedAuthPage = ({ onLogin, onSignup }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <div className={styles.combinedAuthPage}>
      <div className={styles.authContainer}>
        <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
        <div className={styles.authForm}>
          {isLoginMode ? (
            <LoginForm onLogin={onLogin} />
          ) : (
            <SignupForm onSignup={onSignup} />
          )}
          <p className={styles.toggleLink}>
            {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={toggleMode}>
              {isLoginMode ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CombinedAuthPage;

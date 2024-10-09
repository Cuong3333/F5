// src/components/ProgressBar.js
import React from 'react';
import styles from '../styles/ProgressBar.module.css';

const ProgressBar = () => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>
    </div>
  );
};

export default ProgressBar;

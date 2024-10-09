// src/components/QuestionBox.js
import React from 'react';
import styles from '../styles/QuestionBox.module.css';

const QuestionBox = ({ question }) => {
  return (
    <div className={styles.questionBox}>
      <p>{question}</p>
    </div>
  );
};

export default QuestionBox;

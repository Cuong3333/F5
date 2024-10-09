import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ type, label, onClick }) => {
  const buttonStyle = type === 'primary' ? styles.primaryButton : styles.secondaryButton;

  return (
    <button className={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

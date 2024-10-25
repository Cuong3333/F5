import React from 'react';
import styles from './Input.module.css';

const Input = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={styles.inputField}
  />
);

export default Input;

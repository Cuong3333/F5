import React from 'react';
import styles from './Label.module.css';

const Label = ({ text, htmlFor }) => (
  <label className={styles.label} htmlFor={htmlFor}>
    {text}
  </label>
);

export default Label;

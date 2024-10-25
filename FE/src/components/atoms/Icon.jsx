import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ icon, alt }) => (
  <img src={icon} alt={alt} className={styles.icon} />
);

export default Icon;

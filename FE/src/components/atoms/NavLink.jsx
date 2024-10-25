import React from 'react';
import styles from './NavLink.module.css';

const NavLink = ({ href, label }) => {
  return (
    <a href={href} className={styles.navLink}>
      {label}
    </a>
  );
};

export default NavLink;

import React from 'react';
import styles from '../styles/Header.module.css'; // Đảm bảo bạn có CSS cho Header

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>WellGreen</div>
      <nav>
        <ul className={styles.navLinks}>
          <li><a href="/main">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

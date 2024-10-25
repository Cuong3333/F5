import React from 'react';
import {NavBar} from '../molecules/index';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Your Website Logo</h1>
      <NavBar />
    </header>
  );
};

export default Header;

import React from 'react';
import {Header, Footer} from '../organisms/index';
import styles from './HomeTemplate.module.css';

const HomeTemplate = ({ children }) => {
  return (
    <div className={styles.homeTemplate}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeTemplate;

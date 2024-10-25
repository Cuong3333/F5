import React from 'react';
import {HomeTemplate} from '../templates/index';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <HomeTemplate>
      <section className={styles.introduction}>
        <h2>Welcome to Our Website</h2>
        <p>This is a modern website showcasing our products and services.</p>
        <button className={styles.ctaButton}>Get Started</button>
      </section>
    </HomeTemplate>
  );
};

export default HomePage;

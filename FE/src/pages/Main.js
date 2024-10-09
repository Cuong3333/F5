import React from 'react';
import Header from '../components_big/Header';
import Hero from '../components_big/Hero';
import Features from '../components_big/Features';
import Footer from '../components_big/Footer';
import styles from '../styles/Main.module.css';

const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default MainPage;

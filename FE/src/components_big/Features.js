import React from 'react';
import styles from '../styles/Features.module.css';

const features = [
  { title: 'Health Tracking', description: 'Track your health data.' },
  { title: 'AI-Powered Insights', description: 'Get personalized AI recommendations.' },
  { title: 'Eco-Friendly Tips', description: 'Learn about sustainable living.' }
];

const Features = () => {
  return (
    <section className={styles.features}>
      <h2>Our Features</h2>
      <div className={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

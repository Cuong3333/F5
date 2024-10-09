import React from 'react';
import styles from '../styles/Survey.module.css'; // Import CSS module

const Options = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <div className={styles.optionsGrid}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.optionCard} ${selectedOption === option.text ? styles.selected : ''}`}
          onClick={() => setSelectedOption(option.text)}
        >
          <img src={option.icon} alt={option.text} className={styles.icon} />
          {option.text}
        </div>
      ))}
    </div>
  );
};

export default Options;

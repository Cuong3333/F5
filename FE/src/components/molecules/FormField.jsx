import React from 'react';
import styles from './FormField.module.css';
import { Label, Input, Icon } from '../atoms/index'; // Sử dụng các Atoms từ folder Atoms

const FormField = ({ label, type, placeholder, icon }) => {
  return (
    <div className={styles.formField}>
      {/* Sử dụng Atom Label thay vì thẻ HTML label */}
      <Label text={label} className={styles.label} />
      
      <div className={styles.inputWrapper}>
        {/* Sử dụng Atom Icon thay vì thẻ HTML img nếu có icon */}
        {icon && <Icon src={icon} alt={`${label} icon`} className={styles.icon} />}
        
        {/* Sử dụng Atom Input thay vì thẻ HTML input */}
        <Input type={type} placeholder={placeholder} className={styles.input} />
      </div>
    </div>
  );
};

export default FormField;


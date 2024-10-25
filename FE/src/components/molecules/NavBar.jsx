import React from 'react';
import { useNavigate } from 'react-router-dom';
import {NavLink, Button} from '../atoms/index';
import styles from './NavBar.module.css';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navBar}>
      <NavLink href="/" label="Home" />
      <NavLink href="/about" label="About Us" />
      <NavLink href="/contact" label="Contact" />
      <Button text="Login" onClick={() => navigate('/Login')} /> 
      <Button text="Sign Up" onClick={() => navigate('/Login')} />
    </nav>
  );
};

export default NavBar;

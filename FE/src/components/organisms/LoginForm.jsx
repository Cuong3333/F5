import React, { useState } from 'react';
import { Input, Button } from '../atoms/index';
import { FormField } from '../molecules/index';
import styles from './LoginForm.module.css';
import { login } from '../../api/auth';

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password); // Gọi API
      const { access_token } = data;
      console.log('Access Token:', access_token);
      onLoginSuccess(access_token);
      localStorage.setItem('token', access_token); // Lưu token vào localStorage
    } catch (err) {
      console.error('Login failed:', err);
      setError('Đăng nhập không thành công, vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <FormField label="Email" htmlFor="email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Password" htmlFor="password">
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>

      <Button type="submit" label="Login" className={styles.loginButton} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
    </form>
  );
};

export default LoginForm;

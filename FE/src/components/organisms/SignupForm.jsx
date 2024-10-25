// SignupForm.jsx
import React, { useState } from 'react';
import { Input, Button } from '../atoms/index';
import { FormField } from '../molecules/index';
import styles from './SignupForm.module.css';
import { register } from '../../api/auth';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      setSuccess('');
      return;
    }

    try {

      const request = { 'email':email, 'password':password };

      console.log(request)

      const data = await register(request);
      console.log('User created:', data);
      setSuccess('Đăng ký thành công!');
      setError('');
    } catch (err) {
      console.error('Registration failed:', err.message);
      setError(err.message); // Hiển thị thông báo lỗi chi tiết
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.signupForm}>
      <FormField label="Email" htmlFor="email">
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Mật khẩu" htmlFor="password">
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Xác nhận mật khẩu" htmlFor="confirmPassword">
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </FormField>

      <Button type="submit" label="Đăng ký" className={styles.signupButton} />
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hiển thị lỗi nếu có */}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Hiển thị thông báo thành công nếu có */}
    </form>
  );
};

export default SignupForm;

//src/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:8000'; // URL của backend

// Hàm đăng nhập
export const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      new URLSearchParams({
        username: username,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Ném lỗi ra để xử lý ở component
  }
};
// Ham đăng ký

export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/`, { // Đảm bảo endpoint đúng
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Registration failed');
  }
};
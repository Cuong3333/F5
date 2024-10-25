// src/api/auth.js

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; // Địa chỉ backend của bạn

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
        username: email, // Đảm bảo rằng key là 'username'
        password: password, // Đảm bảo rằng key là 'password'
      });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    throw error.response ? error.response.data : new Error("Đã xảy ra lỗi khi gọi API.");
  }
};

export const register = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(`${API_URL}/user/`, userData);
    return response.data;
  } catch (error) {
    // Nếu có phản hồi từ backend, trả về dữ liệu lỗi chi tiết
    if (error.response && error.response.data) {
      throw new Error(error.response.data.detail || 'Đăng ký không thành công, vui lòng thử lại.');
    }
    // Nếu không có phản hồi, trả về thông báo lỗi chung
    throw new Error('Đã xảy ra lỗi khi gọi API.');
  }
};


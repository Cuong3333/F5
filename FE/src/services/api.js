import axios from 'axios';

// Khởi tạo axios instance nếu cần cấu hình cụ thể
const api = axios.create({
  baseURL: 'https://your-backend-url.com/api', // Địa chỉ của backend API
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Ví dụ: sử dụng token để xác thực
  }
});

// Hàm để lấy dữ liệu từ backend
export const fetchSurveyResults = () => {
  return api.get('/survey-results');
};

// Hàm để gửi kết quả khảo sát lên backend
export const submitSurveyResults = (surveyData) => {
  return api.post('/submit-survey', surveyData);
};

// Các hàm khác như cập nhật hay xóa dữ liệu
// export const updateSurveyResult = (id, data) => {
//   return api.put(`/survey-results/${id}`, data);
// };

// export const deleteSurveyResult = (id) => {
//   return api.delete(`/survey-results/${id}`);
// };


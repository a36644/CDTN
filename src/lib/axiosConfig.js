// src/axiosConfig.js
import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081', // Thay bằng API base URL của bạn
  timeout: 10000, // Thời gian chờ (timeout) cho mỗi request (10 giây)
  headers: {
    'Content-Type': 'application/json', // Thiết lập header mặc định
    // Thêm các header khác nếu cần
  },
});

// Cấu hình interceptors nếu cần (cho việc xử lý lỗi hoặc thêm thông tin)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Xử lý lỗi chung ở đây, ví dụ: thông báo lỗi, làm mới token, v.v.
    return Promise.reject(error);
  }
);

export default axiosInstance;

// src/api.js
import axiosInstance from './axiosConfig';

// Hàm fetch GET data
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    // Xử lý lỗi (có thể log hoặc throw error)
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Hàm fetch POST data
export const postData = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Các hàm PUT, DELETE có thể được tạo tương tự

import axiosInstance from "./axiosConfig";

const baseUrl = "http://localhost:8081/";

// Hàm fetch GET data
export const fetchData = async (endpoint, params = {}) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.get(baseUrl + endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Hàm fetch POST data
export const postData = async (endpoint, data, params) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(baseUrl + endpoint, data, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Hàm fetch PUT data
export const putData = async (endpoint, data, params) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.put(baseUrl + endpoint, data, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Hàm delete data
export const deleteData = async (endpoint, params) => {
  try {
    const token = localStorage.getItem("token");
    await axiosInstance.delete(baseUrl + endpoint, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

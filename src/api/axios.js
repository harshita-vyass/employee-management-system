import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.29.14:8080/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClient = {
  post: async (url, payload = {}) => {
    try {
      const response = await api.post(url, payload);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default apiClient
import axios from "axios";
import { getStringFromLocalStorage } from "../utils/common";

const serviceConfig = {
  auth: {
    baseURL: "http://localhost:8989/api/v1/",
  },
  default: {
    baseURL: "http://192.168.29.94:8080/api/v1/",
  },
};
const getAxiosInstance = (serviceName) => {
  const config = serviceConfig[serviceName ?? "default"];
  // console.log(config);

  const instance = axios.create({
    baseURL: config.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (request) => {
      var token = getStringFromLocalStorage("token", false);
      if (token && serviceName !== "auth") {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export const apiClient = {
  post: async (url, payload = {}) => {
    try {
      const response = await getAxiosInstance().post(url, payload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  get: async (url, params = {}) => {
    try {
      const response = await getAxiosInstance().get(url, { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  patch: async (url, params = {}) => {
    try {
      const response = await getAxiosInstance().patch(url, null, { params });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const authClient = {
  post: async (url, payload = {}) => {
    try {
      const response = await getAxiosInstance("auth").post(url, payload);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

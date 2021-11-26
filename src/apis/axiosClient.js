import axios from "axios";

export const baseURL = "https://tss.com";

const axiosClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default axiosClient;
  
  axiosClient.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  axiosClient.interceptors.response.use(
    function (response) {
      return response?.data ?? {};
    },
    function (error) {
      if (error?.response?.data?.code) {
        return error?.response?.data ?? {};
      } else {
        return Promise.reject(error);
      }
    }
  );
  
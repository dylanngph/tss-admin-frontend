import axios from "axios";

const AxiosBase = (baseURL) => {
  const REQUEST_TIMEOUT = 60000;
  const axiosBase = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: REQUEST_TIMEOUT,
  });

  axiosBase.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosBase.interceptors.response.use(
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

  return axiosBase
};

export default AxiosBase;

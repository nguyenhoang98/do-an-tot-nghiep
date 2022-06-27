import { message } from 'antd';
import axios from 'axios';

const axiosClient = axios.create({});

export const addToken = token => {
  if (token) {
    axiosClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('token-id')}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    message.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default axiosClient;

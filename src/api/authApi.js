import axiosClient from './axiosClient';
import queryString from 'query-string';
import axios from 'axios';
import { apiUrl } from '../constants';

const authApi = {
  registrationApi: data => axiosClient.post(`${apiUrl}/auth/register`, data),
  loginApi: data => axiosClient.post(`${apiUrl}/auth/login`, data),
  checkApi: () => axiosClient.get(`${apiUrl}/auth`),

  getListUser: payload =>
    axiosClient.get(`${apiUrl}/auth/list?${queryString.stringify(payload)}`),
  deleteUser: id => axiosClient.delete(`${apiUrl}/auth/delete/${id}`),
  updateUser: (id, data) =>
    axiosClient.put(`${apiUrl}/auth/update/${id}`, data),
  updateUserRole: (id, data) =>
    axiosClient.put(`${apiUrl}/auth/update/role/${id}`, data),
  uploadAvatar: (data, cloudName) =>
    axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data),
};

export default authApi;

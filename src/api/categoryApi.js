import axiosClient from './axiosClient';
import { apiUrl } from '../constants';

const categoryApi = {
  getCategoryApi: () => axiosClient.get(`${apiUrl}/category/get`),
  createCategoryApi: data =>
    axiosClient.post(`${apiUrl}/category/create`, data),
  updateCategoryApi: data =>
    axiosClient.put(`${apiUrl}/category/update/${data.id}`, data),
  deleteCategoryApi: id =>
    axiosClient.delete(`${apiUrl}/category/delete/${id}`),
};

export default categoryApi;

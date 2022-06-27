import axiosClient from './axiosClient';
import queryString from 'query-string';
import { apiUrl } from '../constants';

const productApi = {
  createProductApi: data => axiosClient.post(`${apiUrl}/product/create`, data),
  getProductApi: payload =>
    axiosClient.get(`${apiUrl}/product?${queryString.stringify(payload)}`),
  deleteProduct: id => axiosClient.delete(`${apiUrl}/product/delete/${id}`),
  updateProduct: (id, data) =>
    axiosClient.put(` ${apiUrl}/product/update/${id}`, data),
  ratingProduct: (data, idProduct) =>
    axiosClient.post(`${apiUrl}/product/rating/${idProduct}`, data),
};

export default productApi;

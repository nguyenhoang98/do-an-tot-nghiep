import axiosClient from './axiosClient';
import { apiUrl } from '../constants';

const orderApi = {
  postDataOrder: data => axiosClient.post(`${apiUrl}/order/post`, data),
  getDataOrder: () => axiosClient.get(`${apiUrl}/order/get`),
  deleteDataOrder: id => axiosClient.delete(`${apiUrl}/order/delete/${id}`),
  deliveryDataOrder: (id, data) =>
    axiosClient.put(`${apiUrl}/order/delivery/${id}`, data),
  completeDataOrder: (id, data) =>
    axiosClient.put(`${apiUrl}/order/complete/${id}`, data),

  postDataOrderHistory: data =>
    axiosClient.post(`${apiUrl}/orderHistory/post`, data),
  getDataOrderHistory: () => axiosClient.get(`${apiUrl}/orderHistory/get`),
};
export default orderApi;

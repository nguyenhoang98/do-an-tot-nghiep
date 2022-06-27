import axiosClient from './axiosClient';
import { apiUrl } from '../constants';

const cartApi = {
  addCart: data => axiosClient.post(`${apiUrl}/cart/add-to-cart`, data),
  getListCartProduct: () => axiosClient.get(`${apiUrl}/cart/get-cart`),
  deleteCartItem: (productId, data) =>
    axiosClient.put(`${apiUrl}/cart/delete-to-cart/${productId}`, data),
};
export default cartApi;

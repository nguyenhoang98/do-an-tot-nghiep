import axiosClient from './axiosClient';
import { apiUrl } from '../constants';

const commentApi = {
  getComment: idProduct =>
    axiosClient.get(`${apiUrl}/comment/get/${idProduct}`),
  postComment: (idProduct, data) =>
    axiosClient.post(`${apiUrl}/comment/post/${idProduct}`, data),
  deleteComment: (idComment, productId) =>
    axiosClient.delete(`${apiUrl}/comment/delete/${idComment}/${productId}`),
  updateComment: (idComment, productId, data) =>
    axiosClient.put(`${apiUrl}/comment/update/${idComment}/${productId}`, data),
};
export default commentApi;

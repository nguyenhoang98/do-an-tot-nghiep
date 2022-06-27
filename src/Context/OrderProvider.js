import { message } from 'antd';
import react, { useState } from 'react';
import orderApi from '../api/orderApi';

export const OrderContext = react.createContext();

function OrderProvider({ children }) {
  const [isDataOrder, setIsDataOrder] = useState([]);
  const [isDataOrderHistory, setIsDataOrderHistory] = useState([]);

  const getDataOrder = async () => {
    try {
      const response = await orderApi.getDataOrder();
      setIsDataOrder(response.data.dataOrders);
    } catch (error) {}
  };
  const deleteOrder = async id => {
    try {
      await orderApi.deleteDataOrder(id);
      message.success('Xóa đơn đặt hàng thành công');
      getDataOrder();
    } catch (error) {}
  };
  const handleDelivery = async (id, data) => {
    try {
      await orderApi.deliveryDataOrder(id, data);
      message.success(
        'Cập nhật đơn hàng sang trạng thái đang chuyển hàng thành công'
      );
      getDataOrder();
    } catch (error) {}
  };
  const handleComplete = async (id, data) => {
    try {
      await orderApi.completeDataOrder(id, data);
      message.success('Đơn hàng đã hoàn thành');
      getDataOrder();
    } catch (error) {}
  };

  const getOrderHistory = async () => {
    try {
      const response = await orderApi.getDataOrderHistory();
      setIsDataOrderHistory(response.data.history);
    } catch (error) {}
  };
  const postOrderHistory = async data => {
    try {
      await orderApi.postDataOrderHistory(data);
      getOrderHistory();
    } catch (error) {}
  };
  return (
    <OrderContext.Provider
      value={{
        isDataOrder,
        setIsDataOrder,
        getDataOrder,
        deleteOrder,
        handleComplete,
        handleDelivery,
        getOrderHistory,
        isDataOrderHistory,
        postOrderHistory,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
export default OrderProvider;

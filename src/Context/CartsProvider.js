import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import cartApi from '../api/cartApi';
import { message } from 'antd';

export const CartContext = React.createContext();

function CartsProvider({ children }) {
  const {
    isInfoUsername: { isAuthentication },
  } = useContext(AuthContext);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [dataCarts, setDataCarts] = useState(null);
  useEffect(() => {
    if (isAuthentication) getDataCarts();
  }, [isAuthentication]);
  const getDataCarts = async () => {
    try {
      const response = await cartApi.getListCartProduct();
      setDataCarts(response.data.carts);
    } catch (error) {}
  };
  const onAddToCart = async data => {
    try {
      setIsLoadingBtn(true);
      await cartApi.addCart(data);
      message.success('Thêm vào giỏ hàng thành công');
      getDataCarts();
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };
  const onDeleteCart = async (productId, data) => {
    try {
      await cartApi.deleteCartItem(productId, data);
      message.success('Xóa sản phẩm trong giỏ hàng thành công');
      getDataCarts();
    } catch (error) {}
  };
  return (
    <CartContext.Provider
      value={{
        getDataCarts,
        onAddToCart,
        onDeleteCart,
        dataCarts,
        setDataCarts,
        isLoadingBtn,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartsProvider;

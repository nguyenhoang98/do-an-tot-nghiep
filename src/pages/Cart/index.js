import { useEffect } from 'react';
import './index.css';
import { Typography } from 'antd';
import { CartList } from '../../components/Cart';
import OrderHistory from '../../components/OrderHistory/OrderHistory';

const { Title } = Typography;

function Carts(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className='cart-container'>
      <Title level={5}>Giỏ hàng của bạn</Title>
      <CartList />
      <Title level={5}> Lịch sử mua hàng </Title>
      <OrderHistory />
    </div>
  );
}

export default Carts;

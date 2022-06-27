import { useEffect, useContext } from 'react';
import { OrderContext } from '../../Context/OrderProvider';
import { CartContext } from '../../Context/CartsProvider';
import { Table, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

function OrderHistory(props) {
  const { onAddToCart, isLoadingBtn } = useContext(CartContext);
  const { isDataOrderHistory, getOrderHistory } = useContext(OrderContext);
  useEffect(() => {
    getOrderHistory();
  }, []);
  console.log('isDataOrderHistory', isDataOrderHistory);
  const columns = [
    {
      title: '#',
      dataIndex: '',
      key: '',
      render: (text, object, index) => index + 1,
    },
    {
      title: 'Ảnh',
      dataIndex: '',
      key: '',
      render: ({ productSrc }) => (
        <img
          src={productSrc}
          style={{
            width: '50px',
            height: '50px',
          }}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Chi tiết',
      dataIndex: '',
      key: '',
      render: ({ color, size, quantity, price, discount }) => (
        <div>
          <div> Màu : {color} </div>
          <div> Size : {size} </div>
          <div> Số lượng : {quantity} </div>
          <div>
            Giá : {price.toLocaleString()}
            <sup>vnd</sup>
          </div>
          <div> Giảm giá : {discount || 0}% </div>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: '',
      key: '',
      render: ({ afterPrice }) => (
        <div className='font-weight-bold'>
          {afterPrice.toLocaleString()}
          <sup>vnd</sup>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: value => (
        <div>
          <Button
            type='primary'
            loading={isLoadingBtn}
            onClick={() =>
              onAddToCart({
                id: value.productId,
                quantity: value.quantity,
                color: value.color,
                size: value.size,
                price: value.price,
              })
            }
          >
            <ShoppingCartOutlined />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        size='small'
        dataSource={isDataOrderHistory[0]?.dataCarts}
        columns={columns}
      />
    </div>
  );
}

export default OrderHistory;

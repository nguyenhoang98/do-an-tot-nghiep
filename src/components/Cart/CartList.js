import { useContext } from 'react';
import './CartList.css';
import { CartContext } from '../../Context/CartsProvider';
import { Button, Col, Input, Popconfirm, Row, Table } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function CartList(props) {
  const { dataCarts, onAddToCart, onDeleteCart, isLoadingBtn } =
    useContext(CartContext);
  const handleDeleteCartProduct = (idProduct, data) => {
    onDeleteCart(idProduct, data);
  };
  const handleAddToCart = (data, quantity) => {
    const payload = {
      id: data.productId,
      quantity: quantity,
      color: data.color,
      size: data.size,
      price: data.price,
    };
    if (data.quantity === 1 && quantity === -1) {
      onDeleteCart(data.productId, { size: data.size, color: data.color });
    } else {
      onAddToCart(payload);
    }
  };
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
      render: item => <img src={item.productSrc} className='cartList-img' />,
      align: 'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
    },
    {
      title: 'Chi tiết',
      dataIndex: '',
      key: '',
      render: item => {
        return (
          <div>
            <div> Màu : {item.color} </div>
            <div> Size : {item.size} </div>
            <div>
              Giá : {item.price.toLocaleString()}
              <sup>vnd</sup>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: '',
      key: '',
      width: 200,
      render: item => {
        return (
          <div>
            <Button
              className='btn-minus'
              icon={<MinusOutlined />}
              onClick={() => handleAddToCart(item, -1)}
              loading={isLoadingBtn}
            />
            <Input value={item.quantity} className='input-quantity' />
            <Button
              className='btn-plus'
              icon={<PlusOutlined />}
              onClick={() => handleAddToCart(item, 1)}
              loading={isLoadingBtn}
            />
          </div>
        );
      },
      align: 'center',
    },
    {
      title: 'Giảm giá',
      dataIndex: '',
      key: '',
      render: item => {
        return <div>{item.discount || 0}%</div>;
      },
      align: 'center',
    },
    {
      title: 'Thành tiền',
      dataIndex: '',
      key: '',
      render: item => {
        return (
          <div className='font-weight-bold'>
            {(item.afterPrice * item.quantity).toLocaleString()}
            <sup>vnd</sup>
          </div>
        );
      },
      align: 'center',
    },
    {
      title: '',
      dataIndex: '',
      key: '',
      render: item => {
        return (
          <div>
            <Popconfirm
              title='Xác nhận lại?'
              onConfirm={() =>
                handleDeleteCartProduct(item.productId, {
                  size: item.size,
                  color: item.color,
                })
              }
              okText='Yes'
              cancelText='No'
            >
              <DeleteOutlined className='cartList-delete' />
            </Popconfirm>
          </div>
        );
      },
      align: 'center',
    },
  ];
  return (
    <div className='cartList-container'>
      {dataCarts && (
        <Table
          columns={columns}
          dataSource={dataCarts[0]?.cartItems}
          size='small'
          scroll={{ x: 'max-content' }}
        />
      )}
      <Row gutter={8} className='cartList-result'>
        <Col span={4} offset={16} className='font-weight-bold'>
          Thành tiền
        </Col>
        <Col span={4} offset={0} className='flex-end'>
          <span className='cartList-totalMoney'>
            {dataCarts &&
              dataCarts[0]?.cartItems
                ?.reduce((total, value) => {
                  return total + value.afterPrice * value.quantity;
                }, 0)
                .toLocaleString()}
            <sup>vnd</sup>
          </span>
        </Col>
      </Row>
      <Row className='cartList-result'>
        <Col span={4} offset={20} className='flex-end'>
          <Button className='btn-payment'>
            <Link to='/thanh-toan'>Thanh toán</Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CartList;

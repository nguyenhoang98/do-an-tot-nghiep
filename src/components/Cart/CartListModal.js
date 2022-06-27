import { useContext } from 'react';
import './CartListModal.css';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartsProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { Button, Col, message, Popconfirm, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function CartListModal(props) {
  const navigate = useNavigate();
  const { dataCarts, onDeleteCart } = useContext(CartContext);
  const {
    isInfoUsername: { isAuthentication },
  } = useContext(AuthContext);
  const handleDeleteCartProduct = idProduct => {
    onDeleteCart(idProduct);
  };
  return (
    <div className='cartListModal-container'>
      <div className='cartListModal-content'>
        {dataCarts &&
          dataCarts[0]?.cartItems?.map((item, index) => {
            return (
              <Row gutter={8} key={index} className='cartListModal-row'>
                <Col span={6}>
                  <img src={item.productSrc} className='cartListModal-img' />
                </Col>
                <Col span={16}>
                  <div className='cartListModal-title'>
                    {item.title} (Số lượng:{item.quantity})
                  </div>
                  <div className='cartListModal-text'>
                    màu:{item.color} - size:{item.size} - giá:
                    {!item.discount ? (
                      <span>
                        {item.price.toLocaleString()}
                        <sup>vnd</sup>
                      </span>
                    ) : (
                      <span>
                        <span className='cartListModal-text-line-through'>
                          {item.price.toLocaleString()}
                        </span>
                        <span>
                          {(
                            item.price -
                            (item.price * item.discount) / 100
                          ).toLocaleString()}
                          <sup>vnd</sup>
                        </span>
                      </span>
                    )}
                  </div>
                  <div className='cartListModal-text'>{item.description}</div>
                </Col>
                <Col span={2} className='flex-vertical-center'>
                  <Popconfirm
                    title='Xác nhận lại?'
                    onConfirm={() => handleDeleteCartProduct(item.productId)}
                    okText='Yes'
                    cancelText='No'
                  >
                    <DeleteOutlined className='cartListModal-delete' />
                  </Popconfirm>
                </Col>
              </Row>
            );
          })}
      </div>
      <Row gutter={8} className='cartListModal-result'>
        <Col span={12} className='font-weight-bold'>
          Thành tiền
        </Col>
        <Col span={12} className='flex-end'>
          <span className='cartListModal-totalMoney'>
            {(dataCarts &&
              dataCarts[0]?.cartItems
                ?.reduce((total, value) => {
                  return total + value.afterPrice * value.quantity;
                }, 0)
                .toLocaleString()) ||
              0}
            <sup>vnd</sup>
          </span>
        </Col>
      </Row>
      <Row gutter={8} className='cartListModal-action'>
        <Col span={12}>
          <Button
            className='w-100 btn-view-cart'
            onClick={() => {
              if (!isAuthentication) {
                message.warning('Bạn cần đăng nhập');
                return;
              }
              navigate('/gio-hang-cua-ban');
            }}
          >
            Xem giỏ hàng
          </Button>
        </Col>
        <Col span={12}>
          <Button
            className='w-100 btn-payment'
            onClick={() => {
              if (!isAuthentication) {
                message.warning('Bạn cần đăng nhập');
                return;
              }
              if (!dataCarts?.length) {
                message.warning('Bạn cần thêm sản phẩm vào giỏ hàng');
                return;
              }
              navigate('/thanh-toan');
            }}
          >
            Thanh toán
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CartListModal;

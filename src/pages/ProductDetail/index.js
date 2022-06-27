import { useContext, useEffect, useState } from 'react';
import './index.css';
import Slider from 'react-slick';
import classNames from 'classnames';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { CartContext } from '../../Context/CartsProvider';
import { useParams } from 'react-router-dom';
import {
  Button,
  Col,
  InputNumber,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import {
  ProductRelated,
  ProductPolicy,
  ProductRating,
  ProductComment,
} from '../../components/ProductDetail';
import { showRating } from '../../common/showUi';

const { Title } = Typography;

function ProductDetail(props) {
  const { dataProducts } = useContext(ProductManagementContext);
  const {
    isInfoUsername: { isAuthentication },
  } = useContext(AuthContext);
  const { isLoadingBtn, onAddToCart, dataCarts } = useContext(CartContext);
  const { id } = useParams();
  const [countQuantity, setCountQuantity] = useState(1);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [isProductDetail, setIsProductDetail] = useState(null);
  const [isCheckSizeAndColor, setIsCheckSizeAndColor] = useState({
    size: null,
    color: null,
  });
  const [isArrayColor, setIsArrayColor] = useState([]);
  const [isArraySize, setIsArraySize] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsCheckSizeAndColor({
      size: null,
      color: null,
    });
    setIsArrayColor([]);
    setIsArraySize([]);
  }, [id]);
  useEffect(() => {
    if (id && dataProducts?.product?.length) {
      const productDetail = dataProducts?.product?.filter(value => {
        return value._id === id;
      });
      setIsProductDetail(productDetail[0]);
    }
  }, [id, dataProducts]);

  useEffect(() => {
    if (isProductDetail?.info?.length) {
      const arrayColor = isProductDetail.info.map(item => item.color);
      const arraySize = isProductDetail.info.map(item => item.size);
      setIsArrayColor(() =>
        isProductDetail.info.filter((item, index) => {
          return arrayColor.indexOf(item.color) === index;
        })
      );
      setIsArraySize(() =>
        isProductDetail.info.filter((item, index) => {
          return arraySize.indexOf(item.size) === index;
        })
      );
    }
  }, [isProductDetail]);

  const handleAddToCart = data => {
    if (!isAuthentication) {
      message.warning('Bạn cần đăng nhập để thực hiện chức năng này');
      return;
    }
    if (!isCheckSizeAndColor.size || !isCheckSizeAndColor.color) {
      message.warning('Bạn hãy chọn color và size');
      return;
    }
    if (handleShowQuantity() < countQuantity + quantityOfProductCart()) {
      message.warning('Số hàng còn lại là không đủ');
      return;
    }
    const payload = {
      id: data._id,
      category: data.category,
      quantity: countQuantity,
      color: isCheckSizeAndColor.color,
      size: isCheckSizeAndColor.size,
      price: data.price,
    };
    console.log('payload', payload);
    onAddToCart(payload);
  };

  const handleShowQuantity = () => {
    const { size, color } = isCheckSizeAndColor;
    if (!size || !color) return isProductDetail?.quantity;
    const productItem = isProductDetail?.info?.find(item => {
      if (item.color === color && item.size === size) return item;
    });
    return productItem?.quantity || 0;
  };
  const quantityOfProductCart = () => {
    const { size, color } = isCheckSizeAndColor;
    const result = dataCarts[0]?.cartItems?.find(
      item =>
        item.productId === id && item.size === size && item.color === color
    );
    return result ? result.quantity : 0;
  };
  const clickColor = color => {
    if (isCheckSizeAndColor.color === color) {
      setIsCheckSizeAndColor({
        ...isCheckSizeAndColor,
        color: null,
      });
      return;
    }
    setIsCheckSizeAndColor({
      ...isCheckSizeAndColor,
      color: color,
    });
  };
  const clickSize = size => {
    if (isCheckSizeAndColor.size === size) {
      setIsCheckSizeAndColor({
        ...isCheckSizeAndColor,
        size: null,
      });
      return;
    }
    setIsCheckSizeAndColor({
      ...isCheckSizeAndColor,
      size: size,
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className='productDetail-container'>
      <Row gutter={48}>
        <Col span={12}>
          <Slider
            asNavFor={nav2}
            ref={c => setNav1(c)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            {...settings}
          >
            {isProductDetail &&
              isProductDetail.productAvatar.map(item => {
                return (
                  <div
                    key={item._id}
                    style={{
                      width: '100%',
                    }}
                  >
                    <img src={item} className='productDetail-img' />
                  </div>
                );
              })}
          </Slider>
          <Slider
            asNavFor={nav1}
            ref={c => setNav2(c)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
          >
            {isProductDetail &&
              isProductDetail.productAvatar.map(item => {
                return (
                  <div
                    key={item._id}
                    style={{
                      width: '100%',
                    }}
                  >
                    <img src={item} className='productDetail-img-column' />
                  </div>
                );
              })}
          </Slider>
        </Col>
        <Col span={12}>
          <div className='productDetail-horizontal-content'>
            <Title level={3}> {isProductDetail?.title} </Title>
            <div>
              {showRating(
                Math.round(
                  isProductDetail?.rating?.reduce((total, value) => {
                    return total + value.count;
                  }, 0) / isProductDetail?.rating?.length
                )
              ) || 0}
            </div>
            <h4> {isProductDetail?.description} </h4>
            <h3 className='productDetail-color-red'>
              <div>
                {isProductDetail?.flashSale && (
                  <span
                    style={{
                      textDecoration: 'line-through',
                      marginRight: '10px',
                    }}
                  >
                    {isProductDetail?.price?.toLocaleString()}
                    <sup>VND</sup>
                  </span>
                )}
                <span>
                  {(
                    isProductDetail?.price -
                    (isProductDetail?.price * isProductDetail?.discount) / 100
                  ).toLocaleString()}
                  <sup>VND</sup>
                </span>
              </div>
            </h3>
          </div>
          <hr />
          <div className='productDetail-horizontal-content'>
            <Row gutter={8} className='productDetail-horizontal-content'>
              <Col span={8}>Màu sắc</Col>
              <Col span={16}>
                {isArrayColor?.map(item => {
                  return (
                    <span
                      key={item._id}
                      className={classNames('productDetail-span', {
                        productDetail_sizeAndColor:
                          isCheckSizeAndColor.color === item.color,
                      })}
                      onClick={() => clickColor(item.color)}
                    >
                      {item.color}
                    </span>
                  );
                })}
              </Col>
            </Row>
            <Row gutter={8} className='productDetail-horizontal-content'>
              <Col span={8}>Kích thước</Col>
              <Col span={16}>
                {isArraySize?.map(item => {
                  return (
                    <span
                      key={item._id}
                      className={classNames('productDetail-span', {
                        productDetail_sizeAndColor:
                          isCheckSizeAndColor.size === item.size,
                      })}
                      onClick={() => clickSize(item.size)}
                    >
                      {item.size}
                    </span>
                  );
                })}
              </Col>
            </Row>
            <Row gutter={8} className='productDetail-horizontal-content'>
              <Col span={8}>Còn hàng</Col>
              <Col span={16}> {handleShowQuantity()} </Col>
            </Row>

            <Row>
              <Col span={8}> Số lượng </Col>
              <Col span={16}>
                <InputNumber
                  min={1}
                  style={{ width: '50px' }}
                  value={countQuantity}
                  onChange={value => {
                    setCountQuantity(value);
                  }}
                />
              </Col>
            </Row>

            <div className='productDetail-horizontal-content'>
              <Space>
                <Button
                  type='primary'
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart(isProductDetail)}
                  loading={isLoadingBtn}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Space>
            </div>
          </div>
          <hr />
          <div className='productDetail-horizontal-content'>
            <Row gutter={8}>
              <Col span={8}>Tư vấn</Col>
              <Col span={16}> 0362.621.627 </Col>
            </Row>
          </div>
          <ProductPolicy />
        </Col>
      </Row>
      <Row gutter={48}>
        <Col span={12}>
          <ProductComment idProduct={id} />
        </Col>
        <Col span={12}>
          <ProductRating idProduct={id} />
        </Col>
      </Row>
      {isProductDetail && (
        <ProductRelated categoryId={isProductDetail.category} />
      )}
    </div>
  );
}

export default ProductDetail;

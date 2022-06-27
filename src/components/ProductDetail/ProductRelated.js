import { useContext } from 'react';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import Slider from 'react-slick';
import { Badge, Button, Card, Typography } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Meta } = Card;

function ProductRelated({ categoryId }) {
  const { dataProducts, setPayload } = useContext(ProductManagementContext);
  useEffect(() => {
    setPayload({ category: categoryId });
  }, [categoryId]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      style={{
        marginTop: '50px',
      }}
    >
      <Title level={5}>Sản phẩm liên quan</Title>
      <Slider {...settings}>
        {dataProducts?.product?.map((value, index) => {
          return (
            <div
              key={index}
              style={{
                width: '100%',
              }}
              onClick={scrollToTop}
            >
              <Card
                cover={
                  <div>
                    {value.flashSale && (
                      <Badge.Ribbon text={<div> Giảm {value.discount}%</div>} />
                    )}
                    <Link to={`/chi-tiet-san-pham/${value._id}`}>
                      <img
                        src={value.productAvatar[0]}
                        className='productList-img'
                      />
                    </Link>
                  </div>
                }
                className='productList-card'
              >
                <Meta
                  title={value.title}
                  description={
                    <div>
                      <div>{value.description}</div>
                      <div className='productList-description'>
                        {value.price.toLocaleString()}
                        <sup>vnd</sup>
                        <div className='productList-grid'>
                          <div>
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                            <StarOutlined />
                          </div>
                          <div> còn {value.quantity} </div>
                        </div>
                        <div className='productList-action'>
                          <Button type='primary'>
                            <Link to={`/chi-tiet-san-pham/${value._id}`}>
                              Xem chi tiết
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                />
              </Card>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default ProductRelated;

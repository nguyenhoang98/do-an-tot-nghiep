import { useContext } from 'react';
import './ProductList.css';
import { Link, useLocation } from 'react-router-dom';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { Typography, Row, Col, Card, Badge, Button } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import ListingFilterProduct from './ListingFilterProduct';
import { showRating } from '../../common/showUi';

const { Meta } = Card;
const { Title } = Typography;

function ProductList({ dataProducts, title }) {
  const { pathname } = useLocation();
  const { textLoading } = useContext(ProductManagementContext);
  return (
    <div>
      <Row>
        <Col span={16}>
          <Title level={5}> {title} </Title>
        </Col>
        <Col span={8}>{pathname !== '/' && <ListingFilterProduct />}</Col>
      </Row>
      <Row gutter={48}>
        {dataProducts?.length ? (
          dataProducts?.map((value, index) => {
            return (
              <Col span={6} key={index}>
                <Card
                  cover={
                    <div>
                      {value.flashSale && (
                        <Badge.Ribbon
                          text={<div> Giảm {value.discount}%</div>}
                        />
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
                          {value.flashSale ? (
                            <span>
                              <span
                                style={{
                                  textDecoration: 'line-through',
                                  marginRight: '10px',
                                }}
                              >
                                {value.price.toLocaleString()}
                              </span>
                              <span>
                                {(
                                  value.price -
                                  (value.price * value.discount) / 100
                                ).toLocaleString()}
                              </span>
                            </span>
                          ) : (
                            value.price.toLocaleString()
                          )}
                          <sup>vnd</sup>
                          <div className='productList-grid'>
                            <div>
                              {showRating(
                                Math.round(
                                  value?.rating?.reduce((total, value) => {
                                    return total + value.count;
                                  }, 0) / value?.rating?.length
                                )
                              ) || 0}
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
              </Col>
            );
          })
        ) : (
          <Col span={8} offset={8} style={{ textAlign: 'center' }}>
            {textLoading}
          </Col>
        )}
      </Row>
    </div>
  );
}

export default ProductList;

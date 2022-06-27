import { useEffect } from 'react';
import { Badge, Card, Col, Row, Typography } from 'antd';

const { Title } = Typography;

function ProductStatistics({
  getDataOrder,
  isDataOrder,
  dataProducts,
  dataCategories,
}) {
  useEffect(() => {
    getDataOrder();
  }, []);

  const showQuantitySale = item => {
    const result =
      isDataOrder
        ?.filter(value => value.status === 'complete')
        ?.map(value => value.dataCarts)[0]
        ?.filter(value => value.category === item._id)
        ?.reduce((total, value) => {
          return total + value.quantity;
        }, 0) || 0;
    return result;
  };
  const showQuantityTotalSale = () => {
    const result =
      isDataOrder
        ?.filter(item => item.status === 'complete')
        ?.reduce((total, value) => {
          return total + value.dataCarts.length;
        }, 0) || 0;
    return result;
  };

  const showQuantityCategoryProduct = item => {
    const result =
      dataProducts?.product
        ?.filter(value => {
          if (value.category === item._id) return value;
        })
        .reduce((total, item) => {
          return total + item.quantity;
        }, 0) || 0;
    return result;
  };

  return (
    <div className='product-statistics'>
      {dataProducts && (
        <Card title='Thông kê chi tiết'>
          <Row gutter={48}>
            <Col span={12}>
              <Title level={5} className='center title'>
                TỔNG SỐ LƯỢNG MẶT HÀNG
              </Title>
              <Title level={5} className='center product-title'>
                <Badge
                  count={dataProducts.totalElement}
                  overflowCount={10000}
                  showZero
                />
              </Title>
              {dataCategories &&
                dataCategories.categoryList.map(item => {
                  return (
                    <Row gutter={8} className='my-10'>
                      <Col span={12}>
                        <span className=''> {item.name} </span>
                      </Col>
                      <Col
                        span={12}
                        style={{ textAlign: 'end', fontWeight: 'bold' }}
                      >
                        <Badge
                          count={showQuantityCategoryProduct(item)}
                          overflowCount={10000}
                          showZero
                        />
                      </Col>
                    </Row>
                  );
                })}
            </Col>
            <Col span={12}>
              <Title level={5} className='center'>
                TỔNG MẶT HÀNG BÁN ĐƯỢC
              </Title>
              <Title level={5} className='center product-title'>
                <Badge count={showQuantityTotalSale()} showZero />
              </Title>
              {dataCategories &&
                dataCategories.categoryList.map(item => {
                  return (
                    <Row gutter={8} className='my-10'>
                      <Col span={12}>
                        <span className=''> {item.name} </span>
                      </Col>
                      <Col
                        span={12}
                        style={{ textAlign: 'end', fontWeight: 'bold' }}
                      >
                        <Badge
                          count={showQuantitySale(item)}
                          overflowCount={10000}
                          showZero
                        />
                      </Col>
                    </Row>
                  );
                })}
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
}

export default ProductStatistics;

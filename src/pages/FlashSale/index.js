import { useContext, useEffect } from 'react';
import './index.css';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import HomeSlider from '../../components/Home/HomeSlider';
import ProductList from '../../components/Common/ProductList';
import { Typography } from 'antd';
import PaginationPage from '../../components/Common/PaginationPage';

const { Title } = Typography;

function FlashSale(props) {
  const { dataProducts, setPayload } = useContext(ProductManagementContext);
  useEffect(() => {
    setPayload({ flashSale: true, page: 1, limit: 12 });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div>
      <HomeSlider />
      <div className='flashSale-container'>
        <Title level={5}>Giảm giá</Title>
        <ProductList dataProducts={dataProducts?.product} />
        <PaginationPage flashSale={true} />
      </div>
    </div>
  );
}

export default FlashSale;

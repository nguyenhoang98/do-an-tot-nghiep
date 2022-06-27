import { useContext, useEffect } from 'react';
import './index.css';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import ProductList from '../../components/Common/ProductList';
import HomeSlider from '../../components/Home/HomeSlider';
import PaginationPage from '../../components/Common/PaginationPage';
import { Typography } from 'antd';

const { Title } = Typography;

function ProductAll(props) {
  const { dataProducts, setPayload } = useContext(ProductManagementContext);

  useEffect(() => {
    setPayload({ page: 1, limit: 12 });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div>
      <HomeSlider />
      <div className='productAll-container'>
        <Title level={5}>Tất cả sản phẩm</Title>
        <ProductList dataProducts={dataProducts?.product} />
        <PaginationPage />
      </div>
    </div>
  );
}

export default ProductAll;

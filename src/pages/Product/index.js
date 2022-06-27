import { useContext, useEffect } from 'react';
import './index.css';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import PaginationPage from '../../components/Common/PaginationPage';
import ProductList from '../../components/Common/ProductList';
import HomeSlider from '../../components/Home/HomeSlider';

function Product({ id, title }) {
  const { dataProducts, setPayload } = useContext(ProductManagementContext);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    setPayload({ category: id, page: 1, limit: 12 });
  }, [id]);

  return (
    <div>
      <HomeSlider />
      <div className='product-container'>
        <ProductList dataProducts={dataProducts?.product} title={title} />
        <PaginationPage category={id} />
      </div>
    </div>
  );
}

export default Product;

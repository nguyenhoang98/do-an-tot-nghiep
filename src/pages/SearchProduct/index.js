import { useContext, useEffect } from 'react';
import './index.css';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import ProductList from '../../components/Common/ProductList';
import { useParams } from 'react-router-dom';
import PaginationPage from '../../components/Common/PaginationPage';

function SearchProduct(props) {
  const { name } = useParams();
  const { dataProducts, setPayload } = useContext(ProductManagementContext);

  useEffect(() => {
    setPayload({ keyword: name, limit: 12 });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [name]);

  return (
    <div className='search-container'>
      <ProductList
        dataProducts={dataProducts.product}
        title={`Kết quả tìm kiếm: ${name}`}
      />
      <PaginationPage keyword={name} />
    </div>
  );
}

export default SearchProduct;

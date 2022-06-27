import { useContext } from 'react';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { Pagination } from 'antd';

function PaginationPage({ flashSale, category, keyword }) {
  const { dataProducts, setPayload } = useContext(ProductManagementContext);
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Pagination
        defaultCurrent={1}
        defaultPageSize={12}
        total={dataProducts.totalFilter}
        onChange={page =>
          setPayload({
            limit: 12,
            page: page,
            flashSale: flashSale,
            category: category,
            keyword: keyword,
          })
        }
      />
    </div>
  );
}

export default PaginationPage;

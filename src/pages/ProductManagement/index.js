import { useEffect, useContext } from 'react';
import './index.css';
import {
  ProductAction,
  ProductManagementCreateModal,
  ProductStatistics,
  ProductTable,
} from '../../components/ProductManagement';
import {
  CategoryAction,
  CategoryModal,
  CategoryTable,
} from '../../components/CategoryManagement';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import { OrderContext } from '../../Context/OrderProvider';

function ProductManagement(props) {
  const {
    dataProducts,
    getDataProducts,
    deleteDataProduct,
    createDataProduct,
    updateDataProduct,
    isVisibleModal,
    setIsVisibleModal,
    formCreate,
    payload,
    setPayload,
    discount,
    setDiscount,
    //category
    isLoadingBtn,
    isVisibleCategoryModal,
    setIsVisibleCategoryModal,
    formCreateCategory,
    createDataCategory,
    dataCategories,
    getDataCategory,
    deleteDataCategory,
    updateDataCategory,
    fileList,
    setFileList,
  } = useContext(ProductManagementContext);
  const { getDataOrder, isDataOrder } = useContext(OrderContext);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPayload({});
  }, []);
  return (
    <div className='container-product'>
      <CategoryAction setIsVisibleCategoryModal={setIsVisibleCategoryModal} />
      <CategoryModal
        isLoadingBtn={isLoadingBtn}
        isVisibleCategoryModal={isVisibleCategoryModal}
        setIsVisibleCategoryModal={setIsVisibleCategoryModal}
        formCreateCategory={formCreateCategory}
        createDataCategory={createDataCategory}
        updateDataCategory={updateDataCategory}
      />
      <CategoryTable
        dataCategories={dataCategories}
        getDataCategory={getDataCategory}
        deleteDataCategory={deleteDataCategory}
        setIsVisibleCategoryModal={setIsVisibleCategoryModal}
        formCreateCategory={formCreateCategory}
      />
      <ProductStatistics
        getDataOrder={getDataOrder}
        isDataOrder={isDataOrder}
        dataProducts={dataProducts}
        dataCategories={dataCategories}
      />
      <ProductAction setIsVisibleModal={setIsVisibleModal} />
      <ProductTable
        dataProducts={dataProducts?.product}
        payload={payload}
        setPayload={setPayload}
        deleteDataProduct={deleteDataProduct}
        formCreate={formCreate}
        setIsVisibleModal={setIsVisibleModal}
        dataCategories={dataCategories}
        setDiscount={setDiscount}
        fileList={fileList}
        setFileList={setFileList}
      />
      <ProductManagementCreateModal
        formCreate={formCreate}
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
        createDataProduct={createDataProduct}
        updateDataProduct={updateDataProduct}
        dataCategories={dataCategories}
        discount={discount}
        setDiscount={setDiscount}
        fileList={fileList}
        setFileList={setFileList}
        isLoadingBtn={isLoadingBtn}
      />
    </div>
  );
}

export default ProductManagement;

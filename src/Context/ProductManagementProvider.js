import React, { useState, useEffect } from 'react';
import authApi from '../api/authApi';
import productApi from '../api/productApi';
import commentApi from '../api/commentApi';
import { message, Form } from 'antd';
import categoryApi from '../api/categoryApi';

export const ProductManagementContext = React.createContext();

function ProductManagementProvider({ children }) {
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [discount, setDiscount] = useState(true);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [payload, setPayload] = useState(null);
  const [formCreate] = Form.useForm();

  const [isVisibleCategoryModal, setIsVisibleCategoryModal] = useState(false);
  const [dataCategories, setDataCategories] = useState([]);
  const [formCreateCategory] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [textLoading, setTextLoading] = useState(null);

  const [dataComment, setDataComment] = useState([]);
  const [isLoadingBtnComment, setIsLoadingBtnComment] = useState(false);
  useEffect(() => {
    getDataCategory();
  }, []);
  useEffect(() => {
    getDataProducts();
  }, [payload]);
  const getDataProducts = async () => {
    try {
      setTextLoading('Loading ...');
      const data = await productApi.getProductApi(payload);
      setDataProducts(data.data);
      if (!data.data.product.length) setTextLoading('Chưa có sản phẩm');
    } catch (error) {}
  };
  const deleteDataProduct = async id => {
    try {
      await productApi.deleteProduct(id);
      await getDataProducts();
      message.success('xóa sản phẩm thành công');
    } catch (error) {}
  };
  const createDataProduct = async data => {
    try {
      setIsLoadingBtn(true);
      const transformInfo = data.info.map(value => {
        return {
          color: value.color.toUpperCase(),
          size: value.size.toUpperCase(),
          quantity: value.quantity,
        };
      });
      const { productAvatar } = data;
      const { fileList } = productAvatar;
      const formData = new FormData();

      const promiseAll = fileList.map(item => {
        formData.append('file', item.originFileObj);
        formData.append('upload_preset', 'to42k53m');
        return authApi.uploadAvatar(formData, 'dbixdfkjm');
      });
      const responsePicture = await Promise.all(promiseAll);
      const arrayPicture = responsePicture.map(item => {
        return item.data.url;
      });
      const response = await productApi.createProductApi({
        ...data,
        productAvatar: arrayPicture,
        info: transformInfo,
      });
      message.success('Tạo sản phẩm thành công');
      getDataProducts();
      return response;
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const updateDataProduct = async data => {
    try {
      setIsLoadingBtn(true);
      const transformInfo = data.info.map(value => {
        return {
          color: value.color.toUpperCase(),
          size: value.size.toUpperCase(),
          quantity: value.quantity,
        };
      });
      let transformPicture = [];
      let checkOrigin = [];
      if (!Array.isArray(data.productAvatar)) {
        const { productAvatar } = data;
        const { fileList } = productAvatar;
        checkOrigin = fileList.filter(item => {
          if (item.name) {
            return item;
          } else {
            transformPicture.push(item.url);
          }
        });
      } else {
        transformPicture = data.productAvatar;
      }
      const formData = new FormData();
      if (checkOrigin.length) {
        const promiseAll = checkOrigin.map(item => {
          formData.append('file', item.originFileObj);
          formData.append('upload_preset', 'to42k53m');
          return authApi.uploadAvatar(formData, 'dbixdfkjm');
        });
        const responsePicture = await Promise.all(promiseAll);
        const arrayResponse = responsePicture.map(item => item.data.url);
        arrayResponse.forEach(item => transformPicture.push(item));
      }
      // handle all
      const response = await productApi.updateProduct(data._id, {
        ...data,
        productAvatar: transformPicture,
        info: transformInfo,
      });
      message.success('Cập nhật thông tin sản phẩm thành công');
      getDataProducts();
      return response;
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };

  // Category

  const getDataCategory = async () => {
    try {
      const response = await categoryApi.getCategoryApi();
      setDataCategories(response.data);
    } catch (error) {}
  };
  const createDataCategory = async data => {
    try {
      setIsLoadingBtn(true);
      await categoryApi.createCategoryApi(data);
      message.success('Tạo thể loại thành công');
      getDataCategory();
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };
  const updateDataCategory = async data => {
    try {
      setIsLoadingBtn(true);
      await categoryApi.updateCategoryApi(data);
      message.success('Cập nhật thể loại thành công');
      getDataCategory();
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };
  const deleteDataCategory = async id => {
    try {
      await categoryApi.deleteCategoryApi(id);
      message.success('Xóa thể loại thành công');
      getDataCategory();
    } catch (error) {}
  };

  const ratingProduct = async (data, idProduct) => {
    try {
      setIsLoadingBtn(true);
      await productApi.ratingProduct(data, idProduct);
      getDataProducts();
      message.success('Bạn đã đánh giá sản phẩm');
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const getComment = async idProduct => {
    try {
      const response = await commentApi.getComment(idProduct);
      setDataComment(response.data.comments);
    } catch (error) {}
  };
  const postComment = async (idProduct, data) => {
    try {
      setIsLoadingBtnComment(true);
      await commentApi.postComment(idProduct, data);
    } catch (error) {
    } finally {
      setIsLoadingBtnComment(false);
    }
  };
  const deleteComment = async (idComment, productId) => {
    try {
      await commentApi.deleteComment(idComment, productId);
    } catch (error) {}
  };

  const updateComment = async (idComment, productId, data) => {
    try {
      await commentApi.updateComment(idComment, productId, data);
    } catch (error) {}
  };

  return (
    <ProductManagementContext.Provider
      value={{
        dataProducts,
        setDataProducts,
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
        // category
        isLoadingBtn,
        isVisibleCategoryModal,
        setIsVisibleCategoryModal,
        formCreateCategory,
        getDataCategory,
        createDataCategory,
        deleteDataCategory,
        dataCategories,
        updateDataCategory,
        ratingProduct,
        //
        textLoading,
        fileList,
        setFileList,
        //
        getComment,
        postComment,
        isLoadingBtnComment,
        dataComment,
        setDataComment,
        deleteComment,
        updateComment,
      }}
    >
      {children}
    </ProductManagementContext.Provider>
  );
}

export default ProductManagementProvider;

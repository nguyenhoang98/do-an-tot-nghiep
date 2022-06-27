import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';
import { addToken } from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const AuthContext = React.createContext();
function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [isInfoUsername, setIsInfoUsername] = useState({
    isAuthentication: false,
    username: null,
    isLoading: false,
  });
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    if (localStorage.getItem('token-id')) {
      addToken(localStorage.getItem('token-id'));
    }
    try {
      setIsInfoUsername({
        isAuthentication: false,
        username: null,
        isLoading: true,
      });
      const response = await authApi.checkApi();
      setIsInfoUsername({
        isAuthentication: true,
        username: response.data.user,
        isLoading: false,
      });
    } catch (error) {
      setIsInfoUsername({
        isAuthentication: false,
        username: null,
        isLoading: false,
      });
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await authApi.checkApi();
      setIsInfoUsername({
        ...isInfoUsername,
        username: response.data.user,
      });
    } catch (error) {
      setIsInfoUsername({
        ...isInfoUsername,
        username: null,
      });
    }
  };

  const register = async data => {
    try {
      setIsLoadingBtn(true);
      let response;
      if (data.profilePicture) {
        const { profilePicture } = data;
        const { fileList: newFileList } = profilePicture;
        const { originFileObj } = newFileList[0];
        let formData = new FormData();
        formData.append('file', originFileObj);
        formData.append('upload_preset', 'to42k53m');
        response = await authApi.uploadAvatar(formData, 'dbixdfkjm');
      }
      await authApi.registrationApi({
        ...data,
        role: 'user',
        profilePicture: response ? response.data.secure_url : null,
      });
      message.success('Đăng ký tài khoản thành công');
      navigate('/dang-nhap');
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const login = async data => {
    try {
      setIsLoadingBtn(true);
      const response = await authApi.loginApi(data);
      message.success('Đăng nhập thành công');
      localStorage.setItem('token-id', response.data.token);
      navigate('/');
      checkLogin();
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const editUser = async data => {
    try {
      setIsLoadingBtn(true);
      let response;
      if (
        data?.profilePicture?.file?.status !== 'removed' &&
        typeof data.profilePicture !== 'string' &&
        data?.profilePicture !== null
      ) {
        const { profilePicture } = data;
        const { fileList: newFileList } = profilePicture;
        const { originFileObj } = newFileList[0];
        let formData = new FormData();
        formData.append('file', originFileObj);
        formData.append('upload_preset', 'to42k53m');
        response = await authApi.uploadAvatar(formData, 'dbixdfkjm');
      }
      await authApi.updateUser(isInfoUsername.username._id, {
        ...data,
        profilePicture: response
          ? response.data.secure_url
          : data.profilePicture?.file?.status === 'removed'
          ? null
          : data.profilePicture,
      });
      message.success('Cập nhật tài khoản thành công');
      navigate('/dang-nhap');
      localStorage.removeItem('token-id');
      setIsInfoUsername({
        isAuthentication: false,
        username: null,
        isLoading: false,
      });
    } catch (error) {
    } finally {
      setIsLoadingBtn(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isInfoUsername,
        setIsInfoUsername,
        register,
        login,
        checkLogin,
        getUserInfo,
        isLoadingBtn,
        editUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

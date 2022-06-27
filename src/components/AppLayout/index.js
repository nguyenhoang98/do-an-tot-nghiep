import { useState, useContext } from 'react';
import './index.css';
import { AuthContext } from '../../Context/AuthProvider';
import { CartContext } from '../../Context/CartsProvider';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  Avatar,
  Badge,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Popover,
  Space,
  Spin,
  message,
  Row,
  Col,
  Typography,
} from 'antd';
import {
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Registration from '../../pages/Registration';
import ProductManagement from '../../pages/ProductManagement';
import UserManagement from '../../pages/UserManagement';
import ProductDetail from '../../pages/ProductDetail';
import EditUserInfo from '../../pages/EditUserInfo';
import NotFound from '../../pages/NotFound';
import Product from '../../pages/Product';
import FlashSale from '../../pages/FlashSale';
import ProductAll from '../../pages/ProductAll';
import Carts from '../../pages/Cart';
import SearchModal from './SearchModal';
import SearchProduct from '../../pages/SearchProduct';
import Payment from '../../pages/Payment';
import OrderConfirm from '../../pages/OrderConfirm';
import { arrayPathNoFooter } from '../../constants';
import { CartListModal } from '../Cart';
import Introduce from '../../pages/Introduce';
import Insurance from '../../pages/Insurance';

const { Content, Footer, Sider } = Layout;
const { Title } = Typography;

function AppLayout(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    isInfoUsername: { isAuthentication, isLoading, username },
    setIsInfoUsername,
  } = useContext(AuthContext);
  const { setDataCarts, dataCarts } = useContext(CartContext);
  const { dataCategories } = useContext(ProductManagementContext);

  const showMenus = () => {
    return (
      <>
        <img
          src='https://res.cloudinary.com/dbixdfkjm/image/upload/v1646686409/logo-fashion_lbmke7.png'
          className='logo'
        />
        <Space style={{ margin: '0px 0px 10px 0px' }}>
          <Popover
            content={<CartDialog />}
            title='Giỏ hàng của bạn'
            placement='bottom'
          >
            <Badge
              count={
                dataCarts &&
                dataCarts[0]?.cartItems?.reduce((total, value) => {
                  return total + value.quantity;
                }, 0)
              }
              showZero={true}
              className='appLayout-badge'
            >
              <ShoppingCartOutlined
                style={{ color: 'black' }}
                className='appLayout-shoppingCart'
                onClick={() => {
                  if (!isAuthentication) {
                    message.warning('Bạn cần đăng nhập');
                    return;
                  }
                  navigate('/gio-hang-cua-ban');
                }}
              />
            </Badge>
          </Popover>
          <SearchOutlined
            className='appLayout-search'
            onClick={() => setIsModalVisible(true)}
          />
          <Popover content={<ContentPopover />} placement='bottom'>
            <Avatar
              size='small'
              src={username?.profilePicture ? username?.profilePicture : null}
              icon={
                !username?.profilePicture && username?.userName ? (
                  username?.userName[0].toUpperCase()
                ) : (
                  <UserOutlined />
                )
              }
            />
          </Popover>
        </Space>
        <Menu theme='light' className='appLayout-menu-content'>
          <Menu.Item key='/'>
            <Link to='/'>Trang chủ</Link>
          </Menu.Item>
          {dataCategories?.categoryList?.map(item => {
            return (
              <Menu.Item key={item._id}>
                <Link to={item.slug}> {item.name} </Link>
              </Menu.Item>
            );
          })}
          {username?.role === 'admin' && (
            <>
              <Menu.Item key='/quan-ly-san-pham'>
                <Link to='/quan-ly-san-pham'>Quản lý sản phẩm</Link>
              </Menu.Item>
              <Menu.Item key='/quan-ly-nguoi-dung'>
                <Link to='/quan-ly-nguoi-dung'>Quản lý người dùng</Link>
              </Menu.Item>
              <Menu.Item key='/xac-nhan-don-hang'>
                <Link to='/xac-nhan-don-hang'>Xác nhận đơn hàng</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </>
    );
  };
  const showPages = () => {
    return (
      <Routes>
        <Route element={<Home />} exact={true} path='/' />
        {dataCategories?.categoryList?.map(item => {
          return (
            <Route
              path={item.slug}
              element={<Product id={item._id} title={item.name} />}
              key={item._id}
              exact={false}
            />
          );
        })}
        <Route element={<Login />} exact={false} path='/dang-nhap' />
        <Route element={<Registration />} exact={false} path='/dang-ky' />
        <Route
          element={<ProductDetail />}
          exact={false}
          path='/chi-tiet-san-pham/:id'
        />
        <Route
          element={<EditUserInfo />}
          exact={false}
          path='/chinh-sua-thong-tin'
        />
        <Route
          element={<FlashSale />}
          path='/san-pham-giam-gia'
          exact={false}
        />
        <Route element={<ProductAll />} path='/tat-ca-san-pham' />
        {isAuthentication && (
          <Route element={<Carts />} path='/gio-hang-cua-ban' exact={false} />
        )}
        <Route element={<SearchProduct />} path='/search/:name' exact={false} />
        {isAuthentication && dataCarts?.length && (
          <Route element={<Payment />} path='/thanh-toan' exact={false} />
        )}
        <Route element={<Introduce />} path='/gioi-thieu' exact={false} />
        <Route element={<Insurance />} path='/bao-hanh' exact={false} />
        <Route
          element={<OrderConfirm />}
          path='/xac-nhan-don-hang'
          exact={false}
        />
        <Route element={<NotFound />} exact={false} path='*' />
        {username?.role === 'admin' && (
          <Route
            element={<ProductManagement />}
            exact={false}
            path='/quan-ly-san-pham'
          />
        )}
        {username?.role === 'admin' && (
          <Route
            element={<UserManagement />}
            exact={false}
            path='/quan-ly-nguoi-dung'
          />
        )}
      </Routes>
    );
  };

  const showActions = () => {
    return (
      <Menu className='appLayout-groupAction' theme='light'>
        <Menu.Item icon={<LoginOutlined />} key='dang-nhap'>
          <Link to='/dang-nhap'>Đăng nhập</Link>
        </Menu.Item>
        <Menu.Item icon={<LogoutOutlined />} key='dang-xuat'>
          <Link to='/dang-ky'>Đăng ký</Link>
        </Menu.Item>
      </Menu>
    );
  };

  const ContentPopover = () => {
    return (
      <div className='appLayout-contentPopover'>
        {isAuthentication && (
          <div>
            <span
              className='appLayout-editInfo'
              onClick={() => navigate('/chinh-sua-thong-tin')}
            >
              Sửa thông tin <EditOutlined />
            </span>
            <br />
          </div>
        )}
        {isAuthentication ? (
          <Button
            onClick={() => {
              setIsInfoUsername({
                isAuthentication: false,
                isLoading: false,
                username: null,
              });
              localStorage.removeItem('token-id');
              setDataCarts(null);
              navigate('/dang-nhap');
            }}
          >
            Đăng xuất
          </Button>
        ) : (
          <Button onClick={() => navigate('/dang-nhap')}> Đăng nhập </Button>
        )}
      </div>
    );
  };
  const CartDialog = () => {
    return (
      <div className='appLayout-cartDialog' style={{ width: '300px' }}>
        <CartListModal userId={username?._id} />
      </div>
    );
  };
  const validateMessages = {
    required: "'Vui lòng nhập trường này'!",
  };

  return (
    <ConfigProvider form={{ validateMessages }}>
      <Layout className='appLayout'>
        <Sider
          className='appLayout-sider appLayout-menuFixed'
          style={{
            zIndex: 99,
          }}
          width={260}
        >
          {showMenus()}
          {showActions()}
        </Sider>
        <Content className='appLayout-content'>
          <Spin
            tip='Loading...'
            className='appLayout-spin'
            spinning={isLoading}
          >
            {showPages()}
            {!arrayPathNoFooter.includes(pathname) && (
              <Footer className='footer'>
                <Row gutter={16}>
                  <Col span={8}>
                    <Title level={5} className='color-white'>
                      MUA HÀNG TRỰC TUYẾN
                    </Title>
                    <div className='color-orange'>0362.xxx.xxx</div>
                    <div className='color-orange'>0362.xxx.xxx</div>
                  </Col>
                  <Col span={8}>
                    <Title level={5} className='color-white'>
                      HOTLINE GÓP Ý
                    </Title>
                    <div className='color-orange'>0362.621.627</div>
                    <div className='color-orange'>
                      nguyenvanhoangg150998@gmail.com
                    </div>
                  </Col>
                  <Col span={8}>
                    <Title level={5} className='color-white'>
                      THÔNG TIN
                    </Title>
                    <div className='color-orange'>
                      <Link
                        to='/gioi-thieu'
                        className='color-orange text-underline'
                      >
                        Giới thiệu
                      </Link>
                    </div>
                    <div className='color-orange'>
                      <Link
                        to='/bao-hanh'
                        className='color-orange text-underline'
                      >
                        Bảo hành
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Footer>
            )}
          </Spin>
        </Content>
        <SearchModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </Layout>
    </ConfigProvider>
  );
}

export default AppLayout;

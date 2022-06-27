import { MailOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import './index.css';

function Insurance(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className='insurance-container'>
      <div className='insurance-title'> Chính sách bảo hành </div>
      <div class='timeline'>
        <div class='container left'>
          <div class='content'>
            <h2>1.Điều kiện bảo hành</h2>
            <p>90 ngày kể từ ngày mua</p>
            <p>
              Quý khách vui lòng giữ lại hóa đơn hoặc cung cấp thông tin mua
              hàng để được hỗ trợ bảo hành 1 cách thuận tiện nhất
            </p>
            <p>
              Sản phẩm có các sự cố kỹ thuật : Đứt chỉ , bục chỉ , lỗi dây kéo ,
              rớt nút
            </p>
          </div>
        </div>
        <div class='container right'>
          <div class='content'>
            <h2>2.Những trường hợp không bảo hành</h2>
            <p>Sản phẩm bị giặt chung với các sản phẩm sẫm màu</p>
            <p>Sử dụng chất tẩy lên sản phẩm</p>
            <p>Sử dụng bàn chải chà mạnh lên sản phẩm</p>
            <p>Sản phẩm do tác động bị hư hại </p>
            <p> Sản phẩm có dấu hiệu qua sửa chữa ở nơi khác </p>
            <p> Sản phẩm quá cũ bị sờn rách trong quá trình sử dụng </p>
          </div>
        </div>
        <div class='container left'>
          <div class='content'>
            <h2>3.Cách thức bảo hành</h2>
            <p>
              <MailOutlined /> Email : nguyenvanhoangg150998@gmail.com
            </p>
            <p>
              <WhatsAppOutlined /> Hotline : 0362.621.627
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insurance;

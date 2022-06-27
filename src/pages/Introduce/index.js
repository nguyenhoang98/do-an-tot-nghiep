import { useEffect } from 'react';
import './index.css';

function Introduce(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <div className='introduce-container'>
      <div className='introduce-title'> Giới thiệu về shop </div>
      <div class='timeline'>
        <div class='container left'>
          <div class='content'>
            <h2>1.Định vị thương hiệu</h2>
            <p>
              Shop là thương hiệu thời trang với giả cả tốt - chất lượng phù hợp
              - đa dạng về mẫu mã và phong cách cho mọi đối tượng
            </p>
          </div>
        </div>
        <div class='container right'>
          <div class='content'>
            <h2>2.Giá trị cốt lõi</h2>
            <p>
              <div>
                Quan tâm quyền lợi - Cân bằng ích lợi - Sáng tạo phát triển -
                Chia sẻ giá trị
              </div>
            </p>
          </div>
        </div>
        <div class='container left'>
          <div class='content'>
            <h2>3.Triết lý đối với khách hàng</h2>
            <p>Lắng nghe - thấu hiểu - tình bạn</p>
          </div>
        </div>
        <div class='container right'>
          <div class='content'>
            <h2>4.Văn hóa</h2>
            <p>
              Sáng tạo - thời trang - mục tiêu - thái độ - trách nhiệm - trung
              thực - nhiệt huyêt - táo bạo - tập trung
            </p>
          </div>
        </div>
        <div class='container left'>
          <div class='content'>
            <h2>5.kết nối và đồng bộ</h2>
            <p>
              Phát huy tính kết nối , chia sẻ và hành động nhiều hơn vì 1 lý
              tưởng chung .
            </p>
          </div>
        </div>
        <div class='container right'>
          <div class='content'>
            <h2>6.sứ mệnh</h2>
            <p>
              giúp cho mọi người có được sản phẩm ưng ý - cá tính - thú vị -
              phong cách
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;

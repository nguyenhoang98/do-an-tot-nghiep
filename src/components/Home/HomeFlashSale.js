import { useContext } from "react";

import { AuthContext } from "../../Context/AuthProvider";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import ProductList from "../Common/ProductList";

const { Title } = Typography;

function HomeFlashSale({ dataProducts }) {
  const {
    isInfoUsername: { username },
  } = useContext(AuthContext);
  return (
    <div>
      <Title level={5}> Giảm giá </Title>
      <ProductList dataProducts={dataProducts} />
      <div style={{ textAlign: "center" }}>
        <Link to="/san-pham-giam-gia">Xem thêm</Link>
      </div>
    </div>
  );
}

export default HomeFlashSale;

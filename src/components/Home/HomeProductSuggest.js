import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import ProductList from "../Common/ProductList";
import { Typography } from "antd";

const { Title } = Typography;

function HomeProductSuggest({ dataProducts }) {
  const {
    isInfoUsername: { username },
  } = useContext(AuthContext);
  return (
    <div>
      <Title level={5}> Gợi ý hôm nay </Title>
      <ProductList dataProducts={dataProducts} />
      <div style={{ textAlign: "center" }}>
        <Link to="/tat-ca-san-pham">Xem thêm</Link>
      </div>
    </div>
  );
}

export default HomeProductSuggest;

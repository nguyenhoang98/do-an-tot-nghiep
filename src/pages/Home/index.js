import { useContext, useEffect } from 'react';
import './index.css';
import { ProductManagementContext } from '../../Context/ProductManagementProvider';
import HomeSlider from '../../components/Home/HomeSlider';
import HomeFlashSale from '../../components/Home/HomeFlashSale';
import HomeProductSuggest from '../../components/Home/HomeProductSuggest';
import HomeStoreSystem from '../../components/Home/HomeStoreSystem';

function Home(props) {
  const { dataProducts, setPayload } = useContext(ProductManagementContext);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setPayload(null);
  }, []);
  return (
    <div>
      <HomeSlider />
      <div className='home-product'>
        <HomeFlashSale
          dataProducts={dataProducts?.product
            ?.filter(item => item.flashSale)
            .slice(0, 4)}
        />
        <HomeProductSuggest
          dataProducts={dataProducts?.product?.slice(0, 12)}
        />
        <HomeStoreSystem />
      </div>
    </div>
  );
}

export default Home;

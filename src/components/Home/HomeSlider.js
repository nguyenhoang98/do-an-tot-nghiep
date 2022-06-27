import './HomeSlider.css';
import { arraySlider } from '../../constants';
import Slider from 'react-slick';

function HomeSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className='homeSlider-container'>
      <Slider {...settings}>
        {arraySlider.map((item, index) => (
          <div className='homeSlider-wrapper' key={index}>
            <img src={item.picture} className='homeSlider-wrapper-img' />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeSlider;

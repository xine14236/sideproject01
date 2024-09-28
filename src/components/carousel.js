import { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination' // 確保引入 pagination 的樣式
import image12000 from '../assets/1-2000.jpg';
import image11500 from '../assets/1-1500.jpg';
import image11000 from '../assets/1-1000.jpg';
import image22000 from '../assets/2-2000.jpg';
import image21500 from '../assets/2-1500.jpg';
import image21000 from '../assets/2-1000.jpg';
import image32000 from '../assets/3-2000.jpg';
import image31500 from '../assets/3-1500.jpg';
import image31000 from '../assets/3-1000.jpg';

// import required modules
import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
} from 'swiper/modules'

// 範例出處
// https://swiperjs.com/demos#thumbs-gallery
// https://codesandbox.io/s/k3cyyc
export default function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
         
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
      >
        <SwiperSlide>
          
          <img
          srcSet={`
            ${image11000} 1000w, 
            ${image11500} 1500w, 
            ${image12000} 2000w
          `}
            className="img-fluid"
            alt="..."
            width={400}
            height={350}
            style={{
              height: '100%',
              width: '100%',

              maxHeight: '80vh',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
                srcSet={`
                  ${image21000} 1000w, 
                  ${image21500} 1500w, 
                  ${image22000} 2000w
                `}
            className="img-fluid"
            alt="..."
            width={400}
            height={350}
            style={{
              height: '100%',
              width: '100%',
              maxHeight: '80vh',
              objectFit: 'cover',
              minHeight:'350px'
             
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
              srcSet={`
                ${image31000} 1000w, 
                ${image31500} 1500w, 
                ${image32000} 2000w
              `}
            className="img-fluid"
            alt="..."
            width={400}
            height={350}
            style={{
              height: '100%',
              width: '100%',
              maxHeight: '80vh',
              objectFit: 'cover',
             minHeight:'350px'
            }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

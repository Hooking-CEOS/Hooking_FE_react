import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper";

const Carousel = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        navigation={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-4.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-5.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-6.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-7.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-8.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-wrapper">
            <img
              src="https://swiperjs.com/demos/images/nature-9.jpg"
              alt="img_src_temp"
            />
            <div className="swiper-slide-div"> Lorem ipsum dolor sit amet </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;

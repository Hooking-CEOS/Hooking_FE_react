import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper";
import { useEffect } from "react";

const Carousel = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        loopedSlides={3}
        centeredSlides={true}
        navigation={true}
        // allowTouchMove={false}
        speed={400}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
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
            {/* 
            TODO : ["] 전용 div 하나 생성하기
            TODO : main_text sub_text css styling
            */}
            <div className="swiper-slide-div">
              <div className="swiper-slide-div-main_text">
                휴대하기 좋은
                <br /> 비건 세럼 립 틴트로
                <br /> 어디서든 촉촉한 입술을
                <br />
                가꿔보세요. ”
              </div>
            </div>
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

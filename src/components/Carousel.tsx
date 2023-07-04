import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";

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
            <CarouselImgDiv imgSrc="https://swiperjs.com/demos/images/nature-1.jpg">
              asdf
            </CarouselImgDiv>
            {/* 
            TODO : ["] 전용 div 하나 생성하기
            TODO : main_text sub_text css styling
            */}
            <div className="swiper-slide-div">
              <div className="swiper-slide-div-main_div">
                “
                <div className="swiper-slide-div-main_text">
                  휴대하기 좋은
                  <br /> 비건 세럼 립 틴트로
                  <br /> 어디서든 촉촉한 입술을
                  <br />
                  가꿔보세요. ”
                  <div className="swiper-slide-div-sub_text">
                    Get moist lips with the portable
                    <br /> vegan serum lip tint.
                  </div>
                </div>
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

const CarouselImgDiv = styled.div<{ imgSrc: string }>`
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  display: flex;
  min-width: 23.4vw;
  min-height: 23.4vw;
  box-shadow: 0px 4px 30px 0px rgba(158, 158, 158, 0.4);
  z-index: 999;
  position: relative;
`;

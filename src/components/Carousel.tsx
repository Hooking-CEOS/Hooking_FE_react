import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { EffectCoverflow, Navigation } from "swiper";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import CarouselData from "@/assets/datas/carousel.json";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const Carousel = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      console.log(swiperRef.current.swiper.realIndex);
      setCurrentSlide(swiperRef.current.swiper.realIndex);
    }
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        onSlideChange={handleSlideChange}
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        loopedSlides={3}
        centeredSlides={true}
        navigation={true}
        allowTouchMove={false}
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
        {CarouselData.map((data, index) => {
          const slideId = Number(data.id) - 1;
          const dataLength = CarouselData.length;
          const tagId =
            slideId === (currentSlide + dataLength - 1) % dataLength
              ? "prev"
              : slideId === (currentSlide + dataLength - 2) % dataLength
              ? "prev2"
              : slideId === (currentSlide + dataLength + 1) % dataLength
              ? "next"
              : slideId === (currentSlide + dataLength + 2) % dataLength
              ? "next2"
              : "";

          return (
            <SwiperSlide
              key={data.id}
              id={tagId}
            >
              <div className="slide-wrapper">
                <CarouselImgDiv imgSrc={data.imgSrc}>
                  {Number(data.id) - 1}
                </CarouselImgDiv>
                <div className="swiper-slide-div">
                  <div className="swiper-slide-div-main_div">
                    “
                    <div className="swiper-slide-div-main_text">
                      {data.desc_main} ”
                      <div className="swiper-slide-div-sub_text">
                        {data.desc_sub}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Carousel;

interface CIDProps {
  imgSrc: string;
}

const CarouselImgDiv = styled.div<CIDProps>`
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  min-width: 23.4vw;
  min-height: 23.4vw;
  box-shadow: 0px 4px 30px 0px rgba(158, 158, 158, 0.4);
  z-index: 999;
  position: relative;
`;

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { EffectCoverflow, Navigation } from "swiper";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import BrandIcon from "@/components/BrandIcon";

import CarouselData from "@/assets/datas/carousel.json";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import BrandMoodButton from "@/components/BrandMoodButton";
import { useNavigate } from "react-router-dom";

interface BrandIconProps {
  name: string;
}

const Carousel = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperRef>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      //console.log(swiperRef.current.swiper.realIndex);
      setCurrentSlide(swiperRef.current.swiper.realIndex);
    }
  };

  const CarouselBrandIcon = ({ name }: BrandIconProps) => {
    return <BrandIcon name={name} />;
  };

  const handleSlideClick = () => {
    navigate("/brand/1");
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
                <CarouselImgDiv
                  imgSrc={data.imgSrc}
                  onClick={handleSlideClick}
                >
                  {currentSlide === slideId && (
                    <>
                      <CarouselIconDiv>
                        <CarouselBrandIcon
                          // name={data.name}
                          name={"피지오겔"}
                        />
                        <CarouselIconText>피지오겔</CarouselIconText>
                      </CarouselIconDiv>
                      <CarouselBrandMoodDiv>
                        <BrandMoodButton name="퓨어한" />
                        <BrandMoodButton name="자연의" />
                        <BrandMoodButton name="감각적인" />
                      </CarouselBrandMoodDiv>
                    </>
                  )}
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
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  min-width: 23.4vw;
  min-height: 23.4vw;
  box-shadow: 0px 4px 30px 0px rgba(158, 158, 158, 0.4);
  z-index: 999;
  position: relative;
`;

const CarouselIconDiv = styled.div`
  position: absolute;
  top: 1.667vw;
  left: 1.667vw;
  gap: 0.833vw;
  display: flex;
  flex-direction: row;
`;

const CarouselIconText = styled.div`
  font-size: 1.25vw;
  font-weight: 700;
  color: ${(props) => props.theme.colors.white80};
  display: flex;
  align-items: center;
`;

const CarouselBrandMoodDiv = styled.div`
  position: absolute;
  bottom: 1.667vw;
  left: 1.667vw;
  gap: 0.521vw;
  display: flex;
  flex-direction: row;
`;

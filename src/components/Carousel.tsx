import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { EffectCoverflow, Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import BrandIcon from "@/components/Brand/BrandIcon";

import imgData from "@/assets/datas/imgData.json";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import BrandMoodButton from "@/components/BrandMoodButton";
import { useNavigate } from "react-router-dom";
import { removeAllSpace } from "@/utils/util";

interface BrandIconProps {
  name: string;
}

interface IImgData {
  id: number;
  name_kr: string;
  name_en: string;
  api_id: string;
  brandDesc: string;
  mood: string[];
  descText: {
    main: string;
    sub: string;
  }[];
}

const Carousel = () => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperRef>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [randNum, _] = useState(Math.floor(Math.random() * 3));
  const [carouselRdy, setCarouselRdy] = useState(false);

  // 브랜드 내에 descText중 몇번째 출력할지 나타내는 변수

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setCurrentSlide(swiperRef.current.swiper.realIndex);
    }
  };

  const CarouselBrandIcon = ({ name }: BrandIconProps) => {
    return <BrandIcon name={name} />;
  };

  useEffect(() => {
    imgData.sort(() => Math.random() - Math.random());

    setCarouselRdy(true);
  }, []);

  const handleSlideClick = (id: string) => {
    navigate("/brand/" + id);
  };

  const RandomText = (data: IImgData) => {
    return (
      <div className="swiper-slide-div">
        <div className="swiper-slide-div-main_div">
          “
          <div className="swiper-slide-div-main_text">
            {data.descText[randNum].main} ”
            <div className="swiper-slide-div-sub_text">
              {data.descText[randNum].sub}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return carouselRdy ? (
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
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={400}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        modules={[Autoplay, EffectCoverflow, Navigation]}
        className="mySwiper"
      >
        {imgData.map((data, index) => {
          const slideId = Number(index);
          const dataLength = 28;
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
            <SwiperSlide key={data.id} id={tagId}>
              <div className="slide-wrapper">
                <CarouselImgDiv
                  imgSrc={require(`../assets/images/brandSearch/brand-search-${removeAllSpace(
                    data.name_kr
                  )}.png`)}
                  onClick={() => {
                    if (currentSlide === slideId) {
                      handleSlideClick(data.id.toString());
                    }
                  }}
                >
                  {currentSlide === slideId && (
                    <>
                      <CarouselIconDiv>
                        <CarouselBrandIcon name={data.name_kr} />
                        <CarouselIconText>{data.name_kr}</CarouselIconText>
                      </CarouselIconDiv>
                      <CarouselBrandMoodDiv>
                        {data.mood.map((mood, index) => {
                          return <BrandMoodButton key={index} name={mood} />;
                        })}
                      </CarouselBrandMoodDiv>
                    </>
                  )}
                </CarouselImgDiv>
                {RandomText(data)}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  ) : (
    <></>
  );
};

export default Carousel;

interface CIDProps {
  imgSrc: string;
}

const CarouselImgDiv = styled.div<CIDProps>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-width: 23.4vw;
  min-height: 23.4vw;
  box-shadow: 0px 4px 30px 0px rgba(158, 158, 158, 0.4);
  border-radius: 2rem 0 0 2rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.imgSrc});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: brightness(0.9);
    border-radius: 2rem;
    z-index: 2;
  }
`;

const CarouselIconDiv = styled.div`
  position: absolute;
  top: 1.667vw;
  left: 1.667vw;
  gap: 0.833vw;
  display: flex;
  flex-direction: row;
  z-index: 3;
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
  z-index: 3;
`;

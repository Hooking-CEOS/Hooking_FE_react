import imgData from "@/assets/datas/imgData.json";
import styled from "styled-components";
import { removeAllSpace } from "@/utils/util";
import BrandIcon from "@/components/Brand/BrandIcon";
import BrandMoodButton from "@/components/BrandMoodButton";
import { useEffect, useState } from "react";

const MobileCarousel = () => {
  const randNum = Math.floor(Math.random() * 3);
  const [randIdx, setRandIdx] = useState<number>(
    Math.floor(Math.random() * 26)
  );

  useEffect(() => {
    imgData.sort(() => Math.random() - Math.random());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandIdx(Math.floor(Math.random() * 26));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselWrapper>
      <CarouselImg
        imgSrc={require(`../../../assets/images/brandSearch/brand-search-${removeAllSpace(
          imgData[randIdx].name_kr
        )}.png`)}
      >
        <CarouselInnerDiv>
          <div className="topArea">
            <CarouselCurrentIdx>{randIdx}/26</CarouselCurrentIdx>
            <CarouselTextArea>
              <div>"</div>
              <div className="mainText">
                {imgData[randIdx].descText[randNum].main} "
              </div>
            </CarouselTextArea>
          </div>
          <div className="bottomArea">
            <CarouselIconArea>
              <div className="iconArea">
                <BrandIcon
                  name={imgData[randIdx].name_kr}
                  size="mobile"
                />
              </div>
              <CarouselBrandIconText>
                {imgData[randIdx].name_kr}
              </CarouselBrandIconText>
            </CarouselIconArea>
            <CarouselBrandMoodDiv>
              {imgData[randIdx].mood.map((mood, index) => {
                return (
                  <BrandMoodButton
                    key={index}
                    name={mood}
                    size="small"
                  />
                );
              })}
            </CarouselBrandMoodDiv>
          </div>
        </CarouselInnerDiv>
      </CarouselImg>
    </CarouselWrapper>
  );
};

export default MobileCarousel;

const CarouselWrapper = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(
    180deg,
    rgba(0, 2, 53, 0) 0%,
    rgba(0, 2, 53, 0.05) 100%
  );
  padding: 0 0.8rem 1.6rem;
`;

const CarouselImg = styled.div<{ imgSrc: string }>`
  width: 100%;
  height: 100%;
  padding: 2.4rem;
  position: relative;
  color: white;
  font-size: 24px;
  overflow: hidden; /* Ensures the blur does not bleed outside the container */
  border-radius: 1.6rem; /* Apply border-radius to the container itself */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(58, 58, 58, 0.6);
    background-blend-mode: multiply;
    z-index: 2; /* Ensures this layer is above the blurred image */
  }

  &::after {
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
    filter: blur(3.5px);
    z-index: 1; /* Below the content layer */
  }
`;

const CarouselInnerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .topArea {
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 3;
  }
  .bottomArea {
    max-height: 4.7rem;
    flex: 0;
    padding-top: 1.8rem;
    border-top: 1px solid ${(props) => props.theme.colors.white40};
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const CarouselCurrentIdx = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.white70};
  padding: 0.6rem 0.8rem 0 0;
`;
const CarouselTextArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  padding-left: 1.6rem;
  font-size: 2.4rem;
  font-weight: 700;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 150%;
`;

const CarouselIconArea = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  .iconArea {
    display: flex;
    aspect-ratio: 1/1;
    height: 100%;
    margin-right: 1.2rem;
  }
`;

const CarouselBrandIconText = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: white;
`;

const CarouselBrandMoodDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  z-index: 1;
`;

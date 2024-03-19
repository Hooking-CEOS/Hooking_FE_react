import { useState } from "react";
import ArrowIcon from "@/assets/images/icon-arrow_component";
import { removeAllSpace } from "@/utils/util";
import styled from "styled-components";

interface IBrandDetailCarouselProps {
  data: {
    main: string;
    sub: string;
  }[];
  name: string;
}

const BrandDetailCarousel = ({ data, name }: IBrandDetailCarouselProps) => {
  const [randIdx, setRandIdx] = useState<number>(Math.floor(Math.random() * 3));
  const handleArrowDecreaseClick = (type: boolean) => {
    if (type) {
      setRandIdx((prev) => (prev + 1) % data.length);
    } else {
      setRandIdx((prev) => (prev - 1 + data.length) % data.length);
    }
  };
  return (
    <CarouselWrapper
      src={require(`../../assets/images/brandBanner/${removeAllSpace(
        name
      )}.png`)}
    >
      <div
        className="arrowArea"
        onClick={() => handleArrowDecreaseClick(false)}
      >
        <ArrowIcon
          direction="left"
          width={16}
          height={32}
          fill="#ffffff66"
        />
      </div>
      <BrandTextArea>
        <span>"</span>
        {data[randIdx].main} "
      </BrandTextArea>

      <div
        className="arrowArea"
        onClick={() => handleArrowDecreaseClick(true)}
      >
        <ArrowIcon
          direction="right"
          width={16}
          height={32}
          fill="#ffffff66"
        />
      </div>
    </CarouselWrapper>
  );
};

export default BrandDetailCarousel;

const CarouselWrapper = styled.div<{ src: string }>`
  width: 100%;
  height: 30rem;
  background-color: red;
  background: url(${(props) => props.src}) no-repeat center / cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  .arrowArea {
    flex-basis: 10%;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const BrandTextArea = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 150%;
  white-space: pre-line;
  gap: 0.8rem;
`;

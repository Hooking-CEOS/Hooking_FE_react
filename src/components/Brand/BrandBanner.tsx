import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";
import BrandIcon from "@/components/Brand/BrandIcon";
import BrandMoodButton from "@/components/BrandMoodButton";
import { useEffect, useState } from "react";

interface BrandBannerProps {
  name: string;
  link: string;
}

const BrandBanner = ({ name, link }: BrandBannerProps) => {
  let targetData = imgData.find((item) => item.name_kr === name)!;

  const RenderCarousel = () => {
    const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 3));

    useEffect(() => {
      const timeOut = setTimeout(() => {
        setRandomNum((randomNum + 1) % 3);
      }, 10000);
      return () => clearTimeout(timeOut);
    }, [randomNum]);

    return (
      <BrandCarouselWrapper>
        <BrandCarouselContainer>
          <div className="mainTextDiv text-heading-2">
            "
            <div className="mainText ">
              <div className="subTextDiv">
                {targetData.descText[randomNum].main} "
                <div className="subText text-subtitle-2">
                  {targetData.descText[randomNum].sub}
                </div>
              </div>
            </div>
          </div>
        </BrandCarouselContainer>
      </BrandCarouselWrapper>
    );
  };
  return (
    <BrandBannerWrapper>
      <BrandBannerDiv
        src={require(`../../assets/images/brandBanner/${targetData.name_kr}.png`)}
        alt="brandBanner"
      />
      <BrandBannerInsideDiv>
        <div className="brandDescSection">
          <div className="brandDescTop">
            <BrandIcon
              name={targetData.name_kr}
              size="big"
              onClick={() => window.open(link, "_blank")}
            />
            <div className="brandDescTextDiv">
              <span className="brandDescName">{targetData.name_kr}</span>
              <div className="brandMoodDiv">
                {targetData.mood.map((item: string, idx) => (
                  <BrandMoodButton key={`targetData-${idx}`} name={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="brandDescText">{targetData.brandDesc}</div>
        </div>

        <RenderCarousel />
      </BrandBannerInsideDiv>
    </BrandBannerWrapper>
  );
};

export default BrandBanner;

const BrandBannerWrapper = styled.div`
  width: 100vw;
  height: 60.2rem;
  position: relative;
`;

const BrandBannerDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BrandBannerInsideDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 12.5rem);
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 6.25vw;
  .brandDescSection {
    display: flex;
    flex-direction: column;
    .brandDescTop {
      display: flex;
      flex-direction: row;
      gap: 1.667vw;
      .brandDescTextDiv {
        display: flex;
        flex-direction: column;
        gap: 0.938vw;
      }
      .brandDescName {
        font-size: 2.083vw;
        color: white;
        font-weight: 700;
      }
      .brandMoodDiv {
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
    }
    .brandDescText {
      margin-top: 4rem;
      white-space: pre-wrap;
      color: white;
      font-size: 16px;
      font-weight: 300;
      line-height: 150%;
    }
  }
`;

const BrandCarouselWrapper = styled.div`
  position: absolute;
  right: 11.8rem;
`;

const BrandCarouselContainer = styled.div`
  width: 40.6rem;
  height: 36.8rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 5.6rem 6.2rem 5.6rem 4rem;
  border-radius: 2rem;
  display: flex;
  gap: 2.8rem;
  .mainTextDiv {
    display: flex;
    flex-direction: row;
  }
  .subTextDiv {
    display: flex;
    margin-left: 1rem;
    flex-direction: column;
    gap: 2.8rem;
  }
  .subText {
    color: ${(props) => props.theme.colors.black30};
  }
`;

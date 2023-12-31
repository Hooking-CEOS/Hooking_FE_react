import styled from "styled-components";
import BrandIcon from "@/components/Brand/BrandIcon";
import BrandMoodButton from "@/components/BrandMoodButton";
import { useEffect, useReducer } from "react";

import leftArrow from "@/assets/images/icon-arrow-left-light.svg";
import rightArrow from "@/assets/images/icon-arrow-right-light.svg";
import { getBrandByName } from "@/utils/util";

interface BrandBannerProps {
  name: string;
  link: string;
}

const BrandBanner = ({ name, link }: BrandBannerProps) => {
  if (name === "skeleton") {
    return (
      <BrandBannerWrapper>
        <div className="skeleton skeleton-list-item"></div>
      </BrandBannerWrapper>
    );
  }
  let targetData = getBrandByName(name);

  const RenderCarousel = () => {
    const reducer = (state: number, action: { type: string }) => {
      switch (action.type) {
        case "next":
          return (state + 1) % 3;
        case "prev":
          return (state + 2) % 3;
        case "0":
          return 0;
        case "1":
          return 1;
        case "2":
          return 2;
        default:
          throw new Error();
      }
    };
    const [randomNum, dispatch] = useReducer(
      reducer,
      Math.floor(Math.random() * 3)
    );
    useEffect(() => {
      const timeOut = setTimeout(() => {
        dispatch({ type: "next" });
      }, 10000);
      return () => clearTimeout(timeOut);
    }, [randomNum]);

    return (
      <BrandCarouselContainer>
        <img
          src={leftArrow}
          alt="left arrow"
          className="arrowBtn left-side"
          onClick={() => dispatch({ type: "prev" })}
        />
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
        <img
          src={rightArrow}
          alt="right arrow"
          className="arrowBtn right-side"
          onClick={() => dispatch({ type: "next" })}
        />
        <div className="pagination">
          {Array.from({ length: 3 }, (_, idx) =>
            idx === randomNum ? (
              <span
                key={`circle-filled-${idx}`}
                className="circle filled"
                onClick={() => dispatch({ type: idx.toString() })}
              />
            ) : (
              <span
                key={`circle-${idx}`}
                className="circle"
                onClick={() => dispatch({ type: idx.toString() })}
              />
            )
          )}
        </div>
      </BrandCarouselContainer>
    );
  };

  return (
    <BrandBannerWrapper>
      <BrandBannerDiv
        src={require(`../../assets/images/brandBanner/${targetData.name_kr.replace(
          / /g,
          ""
        )}.png`)}
        alt="brandBanner"
      />
      <BrandBannerInsideDiv>
        <div className="brandDescSection">
          <div className="brandDescTop">
            <BrandIcon name={targetData.name_kr} size="big" clickRef={link} />
            <div className="brandDescTextDiv">
              <span className="text-heading-1">{targetData.name_kr}</span>
              <div className="brandMoodDiv">
                {targetData.mood.map((item: string, idx) => (
                  <BrandMoodButton key={`targetData-${idx}`} name={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="brandDescText text-body-1">
            {targetData.brandDesc}
          </div>
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
  .skeleton {
    background-color: #e5e6eb;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 11.8rem;
  }
  @-webkit-keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  /*해당되는 컴포넌트에 적용*/
  .skeleton-list-item {
    -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
    animation: skeleton-gradient 1.8s infinite ease-in-out;
  }
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
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 11.8rem;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.white};
  .brandDescSection {
    display: flex;
    flex-direction: column;
    .brandDescTop {
      display: flex;
      flex-direction: row;
      gap: 3rem;
      .brandDescTextDiv {
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
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
    }
  }
`;

const BrandCarouselContainer = styled.div`
  width: 40.6rem;
  height: 36.8rem;
  margin-right: 11.3rem;
  background-color: ${(props) => props.theme.colors.white};
  padding: 5.6rem 4rem 5.6rem 4rem;
  border-radius: 2rem;
  display: flex;
  gap: 2.8rem;
  position: relative;
  .mainTextDiv {
    display: flex;
    flex-direction: row;
    white-space: pre-wrap;
    color: ${(props) => props.theme.colors.black100};
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
  .arrowBtn {
    width: 1.7rem;
    height: 3.4rem;
    cursor: pointer;
    opacity: 0.4;
  }
  .arrowBtn:hover {
    opacity: 1;
  }
  .left-side {
    position: absolute;
    left: -11.3rem;
    top: 16.5rem;
  }
  .right-side {
    position: absolute;
    right: -11.3rem;
    top: 16.5rem;
  }
  .pagination {
    position: absolute;
    top: 40.8rem;
    left: 17.6rem;
    width: 5.4rem;
    height: 30px;
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    .circle {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.white25};
      cursor: pointer;
    }
    .filled {
      background-color: ${(props) => props.theme.colors.white};
    }
  }
`;

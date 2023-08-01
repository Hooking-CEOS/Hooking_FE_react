import styled from "styled-components";
import rightArrow from "@/assets/images/icon-arrow-right-black.svg";
import twoCircle from "@/assets/images/icon_wip_twocircle.svg";

const handleClick = () => {
  // how to open new window
  window.open("https://www.instagram.com/hooking_official/", "_blank");
};

const WIP = () => {
  return (
    <>
      <WIPWrapper>
        <div className="textArea ">
          <div className="fontBig">더 나은 서비스를 준비중이에요!</div>
          <div className="fontSmall">
            후킹에서 현재 개발 중인 페이지입니다. <br />
            더욱 폭넓은 시안 탐색을 위해 나중에 만나요!
          </div>
        </div>
        <MiddleArea>
          <div className="circleDiv" onClick={handleClick} />

          <div className="descText" onClick={handleClick}>
            후킹 소식을 더 알고싶다면?
            <img src={rightArrow} alt="rightArrow" />
            <div className="circleDiv" />
          </div>
        </MiddleArea>
        <BottomArea>
          <img src={twoCircle} alt="twoCircle" />
          <div className="circleDiv" />
        </BottomArea>
      </WIPWrapper>
      <BottomDiv />
    </>
  );
};

export default WIP;

const WIPWrapper = styled.div`
  width: 119.4rem;
  margin: auto;
  .textArea {
    width: 100%;
    margin-top: 18.7rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 5.2rem;
    gap: 3.1rem;
    .fontBig {
      font-size: 6rem;
      font-weight: 700;
    }
    .fontSmall {
      font-size: 2.6rem;
      color: ${(props) => props.theme.colors.black40};
      font-weight: 300;
      line-height: 150%;
    }
  }
`;

const MiddleArea = styled.div`
  height: 10.7rem;
  display: flex;
  align-items: center;
  .circleDiv {
    cursor: pointer;
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.black5};
  }
  .descText {
    cursor: pointer;
    position: relative;
    left: -6.7rem;
    color: ${(props) => props.theme.colors.black100};
    font-size: 2rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
const BottomArea = styled.div`
  margin-top: 15.6rem;
  display: flex;
  gap: 9.1rem;
  img {
    margin-left: 76.8rem;
  }
  .circleDiv {
    width: 10.7rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.point};
  }
`;
const BottomDiv = styled.div`
  width: 100vw;
  height: 6.9rem;
  background-color: ${(props) => props.theme.colors.black100};
`;

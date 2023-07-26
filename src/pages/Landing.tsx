import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";

import iconVector from "@/assets/images/landing/icon-vector.png";
import landing1 from "@/assets/images/landing/landing1.png";
import landing2 from "@/assets/images/landing/landing2.png";
import landing3 from "@/assets/images/landing/landing3.png";
import landing4 from "@/assets/images/landing/landing4.png";
import LandingLoginBtn from "@/components/LandingLoginBtn";

import { activeMenu, loginModalOverlay } from "@/utils/atom";
import { useEffect } from "react";
import LandingHomeBtn from "@/components/LandingHomeButton";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const setLoginModal = useSetRecoilState(loginModalOverlay);
  const handleLogin = () => setLoginModal(true);
  const setActiveMenuIdx = useSetRecoilState(activeMenu);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const [newRef, newInView] = useInView();

  const handleScroll = () => {
    const target = document.getElementById("target");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LandingPageWrapper>
      <LandingPage1>
        <img className="page1Img" src={landing1} alt="landingpage" />
        <LandingLoginBtn onClick={handleLogin} />
        <LandingHomeBtn
          onClick={() => {
            setActiveMenuIdx(0);
            navigate("/home");
          }}
        />
        <img
          src={iconVector}
          alt="vector facing down"
          className="iconVector"
          onClick={handleScroll}
        />
      </LandingPage1>
      <LandingPage2 id="target">
        <div className="textDiv">
          <span className="mainText">
            원하는 무드를
            <br />
            필터로 바로 검색
          </span>
          <span className="subText">
            키워드나 무드를 입력하면
            <br />
            내가 원하는 브랜드 카피를 바로 볼 수 있어요.
          </span>
        </div>
        <img src={landing2} alt="landingpage" className="page2Img" />
      </LandingPage2>
      <div ref={ref}>
        <LandingPage3>
          <img src={landing3} alt="landingpage" className="page3Img" />
          <div className="textDiv">
            <span className="mainText">
              다양한 브랜드의
              <br />
              SNS 카피를 읽고 비교해보세요
            </span>
            <span className="subText">
              후킹이 크롤링한 약 30여개의 브랜드들을 필터링하고,
              <br />
              원하는 브랜드들만 모아서 볼 수 있습니다.
            </span>
          </div>
        </LandingPage3>
        <LandingPage4 ref={newRef}>
          <img src={landing4} alt="landingpage" className="page4Img" />
        </LandingPage4>
      </div>
      {(inView || newInView) && (
        <>
          <LoginDeriveSpan onClick={handleLogin}>
            <LoginDeriveBtn>3초만에 원하는 카피 발견하러 가기</LoginDeriveBtn>
          </LoginDeriveSpan>
        </>
      )}
    </LandingPageWrapper>
  );
};

export default Landing;

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .textDiv {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .mainText {
      color: ${(props) => props.theme.colors.black100};
      font-size: 48px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
    }
    .subText {
      color: ${(props) => props.theme.colors.black40};
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }
  }
`;

const LandingPage1 = styled.div`
  height: 100rem;
  width: 115.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .page1Img {
    width: 100%;
  }
  @keyframes bounce {
    0%,
    100% {
      -webkit-transform: translateY(-25%);
      transform: translateY(-25%);
      -webkit-animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      -webkit-transform: none;
      transform: none;
      -webkit-animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  .iconVector {
    width: 9rem;
    -webkit-animation: bounce 1s infinite;
    animation: bounce 1s infinite;
    cursor: pointer;
  }
`;

const LandingPage2 = styled.div`
  width: 100%;
  height: 60rem;
  background: #f7f8fc;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20rem;

  .page2Img {
    width: 66.8rem;
  }
`;

const LandingPage3 = styled.div`
  width: 100%;
  height: 68rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #fefcfb;
  gap: 13.2rem;
  .page3Img {
    width: 55rem;
  }
`;

const LandingPage4 = styled.div`
  width: 100%;
  height: 55.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .page4Img {
    width: 119.4rem;
  }
`;

const LoginDeriveBtn = styled.div`
  position: sticky;
  bottom: 4rem;
  margin-bottom: 4rem;
  width: 119.5rem;
  height: 10.4rem;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 104px;
  background: linear-gradient(90deg, #ff3c00 0%, #ff7145 59.38%, #ff8845 100%);
  box-shadow: 0px 0px 40px 0px rgba(255, 255, 255, 0.12);
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  color: white;
  cursor: pointer;
  animation: appear 0.5s ease-in-out;
  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const LoginDeriveSpan = styled.span`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0rem;
  width: 100vw;
  height: 100px;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
`;

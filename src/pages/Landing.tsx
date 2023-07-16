import styled from "styled-components";
import { useRecoilState } from "recoil";

import iconVector from "@/assets/images/landing/icon-vector.png";
import landing1 from "@/assets/images/landing/landing1.png";
import landing2 from "@/assets/images/landing/landing2.png";
import landing3 from "@/assets/images/landing/landing3.png";
import landing4 from "@/assets/images/landing/landing4.png";
import LandingLoginBtn from "@/components/LandingLoginBtn";

import Portal from "@/utils/portal";
import Login from "@/pages/Login";
import { loginModalOverlay } from "@/utils/atom";
const Landing = () => {
  const [loginModal, setLoginModal] = useRecoilState(loginModalOverlay);
  const handleLogin = () => setLoginModal(true);
  const handleClose = () => setLoginModal(false);

  return (
    <LandingPageWrapper>
      <LandingPage1>
        <img
          className="page1Img"
          src={landing1}
          alt="landingpage"
        />
        <LandingLoginBtn onClick={handleLogin} />
        <img
          src={iconVector}
          alt="vector facing down"
          className="iconVector"
        />
      </LandingPage1>
      <LandingPage2>
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
        <img
          src={landing2}
          alt="landingpage"
          className="page2Img"
        />
      </LandingPage2>
      <LandingPage3>
        <img
          src={landing3}
          alt="landingpage"
          className="page3Img"
        />
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
      <LandingPage4>
        <img
          src={landing4}
          alt="landingpage"
          className="page4Img"
        />
      </LandingPage4>
    </LandingPageWrapper>
  );
};

export default Landing;

const LandingPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;
  height: 100rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .page1Img {
    width: 115.4rem;
  }
  .iconVector {
    width: 9rem;
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

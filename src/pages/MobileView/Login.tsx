import HookingLogoIcon from "@/assets/images/icon-logo_component";
import styled from "styled-components";
import kakaoLogo from "@/assets/images/icon-kakao-logo.png";
import { ICardData } from "@/utils/type";
import MobileCard from "@/components/MobileView/Home/Card";
import ArrowIcon from "@/assets/images/icon-arrow_component";
import { useEffect } from "react";
import { removeCookie } from "@/hooks/cookies";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLogined } from "@/utils/atom";

const mockCardData: ICardData[] = [
  {
    id: 1,
    text: "휴대하기 좋은\n비건 세럼 틴트로\n어디서든 촉촉한 입술을\n가꿔보세요.\nGet moist lips with\nvegan serum tint\nanywhere, anytime.",
    brandName: "프레시안",
    scrapCnt: 0,
    cardLink: "https://www.missha.com/kr/KR/Item/Detail/2010000000001",
    isScrap: 0,
    createdAt: "2021-08-31T14:00:00",
    index: 0,
  },
  {
    id: 2,
    text: "다가오는 연말,\n소중한 사람에게 기억에\n남을 선물을 찾고있나요?\n샤워젤, 바디버터, 핸드크림 등이 파우치에",
    brandName: "미샤",
    scrapCnt: 0,
    cardLink: "https://www.missha.com/kr/KR/Item/Detail/2010000000001",
    isScrap: 1,
    createdAt: "2021-08-31T14:00:00",
    index: 0,
  },
];

const MobileLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLogined);
  useEffect(() => {
    removeCookie("userToken");
    setIsLogin(false);
  }, []);

  const handleLoginClick = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  const handleNoLoginClick = () => {
    navigate("/");
  };

  return (
    <MobileLoginWrapper>
      <div className="topArea">
        <HookingLogoIcon
          width={183}
          height={54}
        />
        <LoginTextArea>
          후킹으로 매일 새로운 카피 문구를 확인해보세요.
          <br />
          세분화된 필터로 맞춤 카피를 손쉽게 탐색할 수 있습니다.
        </LoginTextArea>
      </div>
      <div className="middleArea">
        <CircleDiv />
        <LoginCardContainer
          left={3}
          top={-12}
        >
          <MobileCard
            data={mockCardData[1]}
            big="small"
          />
        </LoginCardContainer>
        <LoginCardContainer
          left={-3}
          top={-2}
        >
          <MobileCard
            data={mockCardData[0]}
            big="small"
          />
        </LoginCardContainer>
      </div>
      <div className="bottomArea">
        <KakaoBtn onClick={handleLoginClick}>
          카카오 로그인
          <img
            src={kakaoLogo}
            alt="kakaoLogo"
          />
        </KakaoBtn>
        <LoginBtmTextArea onClick={handleNoLoginClick}>
          <div className="contentArea">
            로그인 없이 둘러보기
            <ArrowIcon
              direction="right"
              width={8}
              height={8}
            />
          </div>
        </LoginBtmTextArea>
      </div>
    </MobileLoginWrapper>
  );
};
export default MobileLogin;

const MobileLoginWrapper = styled.div`
  padding: 14.1rem 0 6.4rem;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  .topArea {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
  .middleArea {
    position: absolute;
    top: 50%;
    width: 100%;
  }
  .bottomArea {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    align-items: center;
  }
`;

const CircleDiv = styled.div`
  position: fixed;
  flex-shrink: 0;
  width: 200%;
  transform: translateX(-25%);
  aspect-ratio: 1/1;
  border-radius: 1000px;
  background: radial-gradient(
    80.59% 80.59% at 50% -3.25%,
    rgba(0, 2, 53, 0.07) 0%,
    rgba(0, 2, 53, 0.03) 23.05%,
    rgba(0, 2, 53, 0) 45.35%
  );
  filter: blur(2px);
`;

interface LCCProps {
  left: number;
  top: number;
}
const LoginCardContainer = styled.div<LCCProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: ${({ left }) => `calc(25% + ${left}rem)`};
  top: ${({ top }) => `${top}rem`};
`;

const LoginTextArea = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
`;

const KakaoBtn = styled.div`
  width: 35rem;
  height: 4.6rem;
  background: #fee500;
  border-radius: 0.6rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  img {
    position: absolute;
    left: 1.6rem;
    width: 2.4rem;
    aspect-ratio: 1/1;
  }
  &:active {
    background-color: #e9d200;
  }
`;

const LoginBtmTextArea = styled.div`
  z-index: 3;
  height: 3rem;
  color: ${({ theme }) => theme.colors.black40};
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  width: fit-content;
  padding: 0 1.6rem;
  .contentArea {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

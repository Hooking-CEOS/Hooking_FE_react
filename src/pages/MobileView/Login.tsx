import HookingLogoIcon from "@/assets/images/icon-logo_component";
import styled from "styled-components";
import kakaoLogo from "@/assets/images/icon-kakao-logo.png";

const MobileLogin = () => {
  const handleLoginClick = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
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
      <div className="bottomArea">
        <KakaoBtn onClick={handleLoginClick}>
          카카오 로그인
          <img
            src={kakaoLogo}
            alt="kakaoLogo"
          />
        </KakaoBtn>
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
  .topArea {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
  .bottomArea {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
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

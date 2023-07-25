import styled from "styled-components";
import { useRef } from "react";
import useOutSideClick from "@/hooks/useOutSideClick";
import closeIcon from "@/assets/images/icon-delete.svg";
import hookingIcon from "@/assets/images/icon-logo-text.svg";
import kakaoBtn from "@/assets/images/icon-kakao.png";
import axios from "axios";
import { loginModalOverlay } from "@/utils/atom";

interface LoginProps {
  onClose: () => void;
}
const Login = ({ onClose }: LoginProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onClose?.();
  };

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
    handleClose();
  };

  useOutSideClick(modalRef, handleClose, loginModalOverlay);
  return (
    <LoginContainer ref={modalRef}>
      <CircleDiv />
      <CloseIcon src={closeIcon} alt="closeIcon" onClick={handleClose} />
      <HookingLogo src={hookingIcon} alt="hookingIcon" />
      <WelcomeText>
        후킹으로 매일 새로운 카피 문구를 확인해보세요
        <br />
        세분화된 필터로 맞춤 카피를 손쉽게 탐색할 수 있습니다
      </WelcomeText>
      <KakaoBtn src={kakaoBtn} alt="kakaoLogin" onClick={handleLogin} />
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 78.6rem;
  height: 58.6rem;
  flex-shrink: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
`;
const CircleDiv = styled.div`
  position: fixed;
  flex-shrink: 0;
  width: 100%;
  height: 50%;
  border-radius: 2rem;
  box-shadow: 0px 0px 50px 0px rgba(0, 2, 53, 0.06);
`;
const CloseIcon = styled.img`
  position: absolute;
  top: 4rem;
  right: 4rem;
  cursor: pointer;
`;

const HookingLogo = styled.img`
  width: 21.8rem;
  height: 6.4rem;
  margin: 10.4rem 0 1.6rem 0;
`;

const WelcomeText = styled.div`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 300;
  line-height: 150%;
  color: ${(props) => props.theme.colors.black40};
`;

const KakaoBtn = styled.img`
  width: 52.6rem;
  height: 9rem;
  margin-top: 15.4rem;
  cursor: pointer;
`;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

import styled from "styled-components";
import { Z_INDEX_TOAST } from "@/utils/constants";
import { toastPopup } from "@/utils/atom";
import { useSetRecoilState } from "recoil";

const Toast = () => {
  const navigate = useNavigate();
  const [close, setClose] = useState(false);
  const setToast = useSetRecoilState(toastPopup);

  const handleTimer = () => {
    setTimeout(() => {
      setClose(true);
    }, 2000);
    setTimeout(() => {
      setToast(false);
    }, 2500);
  };
  useEffect(() => {
    handleTimer();
  }, []);

  return (
    <ToastWrapper className={`${close ? "close" : ""}`}>
      <p>
        <span className="icon icon-check-circle" />
        <span className="text-subtitle-1">카피가 북마크에 저장됨</span>
      </p>
      <Button
        text="내 북마크"
        className="button-orange component-default"
        onClick={() => navigate("/bookmark")}
      />
      <span
        className="icon icon-delete"
        onClick={() => {
          setToast(false);
          setClose(true);
        }}
      ></span>
    </ToastWrapper>
  );
};

export default Toast;

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 4.8rem;
  right: 4rem;
  z-index: ${Z_INDEX_TOAST};
  background-color: white;
  gap: 2.4rem;

  &.close {
    visibility: hidden;
    transition: 0.3s ease-out;
    opacity: 0;
  }

  @keyframes fadeinUp {
    0% {
      opacity: 0;
      transform: trnaslate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }

  animation: fadeinUp 0.8s;

  width: 45.6rem;
  height: 9.6rem;

  border-radius: 20px;
  border: 0.25px solid ${({ theme }) => theme.colors.black40};
  background: ${({ theme }) => theme.colors.white};
  padding: 2.4rem 3rem;

  box-shadow: 0px 0px 40px 0px rgba(158, 158, 158, 0.12);

  p {
    display: flex;
    align-items: center;
    gap: 1rem;

    .text-subtitle-1 {
      width: 18.8rem;
    }
  }
`;

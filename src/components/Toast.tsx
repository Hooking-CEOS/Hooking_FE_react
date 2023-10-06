import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";

import styled from "styled-components";
import { Z_INDEX_TOAST } from "@/utils/constants";
import {
  deleteToastPopup,
  recentDeleteCopy,
  restoreCopy,
  savedIdLists,
  setSaveId,
  toastPopup,
} from "@/utils/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { scrapCopy } from "@/api/copywriting";

const Toast = () => {
  const navigate = useNavigate();
  const [close, setClose] = useState(false);
  const setToast = useSetRecoilState(toastPopup);
  const [saved, setDeleteToast] = useRecoilState(deleteToastPopup); // delete 팝업인지 여부
  const setRestoreCopy = useSetRecoilState(restoreCopy);
  const setSaveIdList = useSetRecoilState(setSaveId);
  const recentCopy = useRecoilValue(recentDeleteCopy);

  const handleTimer = () => {
    const timer1 = setTimeout(() => {
      setClose(true);
    }, 2000);

    const timer2 = setTimeout(() => {
      setToast(false);
      if (saved) {
        setDeleteToast(false); // 삭제 -> 원래대로 변경
      }
    }, 2500);

    // unload시 timer 제거
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  useEffect(() => {
    // unload시 timer 제거
    const clearTimers = handleTimer();

    return () => {
      clearTimers();
    };
  }, []);

  const handleRestore = async () => {
    const data = await scrapCopy({ cardId: recentCopy.id });

    if (data.code === 200) {
    } else if (data.code === 400) {
      alert(data.message);
    }
    // 북마크에 다시 추가해주기
    setRestoreCopy(true);
  };

  return (
    <ToastWrapper className={`${close ? "close" : ""}`}>
      <p>
        <span className={`icon icon-${saved ? "delete" : "check"}-circle`} />
        <span className="text-subtitle-1">
          {saved ? "카피를 북마크에서 삭제함" : "카피가 북마크에 저장됨"}
        </span>
      </p>
      <Button
        text={saved ? "복구하기" : "내 북마크"}
        className="button-orange component-default"
        onClick={() => {
          saved ? handleRestore() : navigate("/bookmark");
        }}
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

/*
function setSaveIdList(arg0: any) {
  throw new Error("Function not implemented.");
}

*/

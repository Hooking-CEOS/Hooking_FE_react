import styled from "styled-components";
import {
  deleteToastPopup,
  recentDeleteCopy,
  savedIdLists,
  setSaveId,
} from "@/utils/atom";

import { useState, useRef, SetStateAction } from "react";
import Button from "@/components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { ICardData } from "@/utils/type";
import { flexColumnCenter } from "@/styles/theme";
import { useSetRecoilState, useRecoilValue } from "recoil";

import {
  toastPopup,
  isLogined,
  loginModalOverlay,
  selectedCopy,
} from "@/utils/atom";
import { GetHighlight } from "@/utils/util";
import { cancelScrap, scrapCopy } from "@/api/copywriting";
import React from "react";

interface BrandProps {
  text: string;
  brandName: string;
  brandId: number;
  brandImg?: string;
  saved?: boolean;
  srcIdx?: number;
  scrapCnt?: number;
  isScrap?: number;
  keyword?: string;
  setSaved?: React.Dispatch<SetStateAction<boolean | undefined>>;
  onClick?: () => void;
}

// 단어 단위로 쪼개서 단어가 # 또는 @로 시작하면 밑줄

const BrandCard = ({
  text,
  brandName,
  brandImg,
  scrapCnt,
  isScrap,
  brandId,
  saved,
  keyword,
  onClick,
}: BrandProps) => {
  const [hover, setHover] = useState(false);
  const isLogin = useRecoilValue(isLogined);
  const setToast = useSetRecoilState(toastPopup);
  const setLogin = useSetRecoilState(loginModalOverlay);

  const [forceHover, setForceHover] = useState(false);
  const setDeleteToast = useSetRecoilState(deleteToastPopup);

  //const keyword = useRecoilValue(search);

  // set
  const setSaveIdList = useSetRecoilState(setSaveId);
  const setRecentDelete = useSetRecoilState(recentDeleteCopy);

  // get
  const savedIdList = useRecoilValue(savedIdLists);

  const saveBtnRef = useRef<any>();
  const cardRef = useRef<any>();

  const setHoverActive = (time: number) => {
    // 강제로 true였다가 2초뒤에 false
    setForceHover(true);
    // 요거머에여 @hyosin
    let test = 0;
    for (let i = 0; i < 100000; i++) {
      test += i;
    }

    const timeout = setTimeout(() => {
      setForceHover(false);
    }, time);
    return () => clearTimeout(timeout);
  };

  const handleCancelScrap = async () => {
    setDeleteToast(true);

    const deleteCopy = {
      id: brandId,
      brandName: brandName,
      scrapCnt: scrapCnt || 1,
      isScrap: isScrap || 1,
      text: text,
      createdAt: "",
    };

    setRecentDelete(deleteCopy);
    const data = await cancelScrap({ cardId: brandId });
    if (data) setToast(true);
  };

  const handleCopyScrap = async () => {
    // 로그인 안된 상태면 로그인 팝업 출력
    if (!isLogin) {
      setLogin(true);
      return;
    }
    const data = await scrapCopy({ cardId: brandId });
    if (data.response?.status === 400) {
      alert(data.response.message);
    } else {
      setHoverActive(2500);
      setToast(true);
      setSaveIdList(brandId as any);
    }
  };

  const handleMouseLeave = () => {
    // 북마크 방금 저장되었으면 2초뒤에 제거
    if (forceHover) {
      const timeout = setTimeout(() => {
        setHover(false);
      }, 2000);
      return () => clearTimeout(timeout);
    } else setHover(false);
  };

  const handleCardOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    if (saveBtnRef.current && saveBtnRef.current.contains(e.target)) return;
    onClick && onClick();
  };

  return (
    <BrandCardWrapper
      saved={saved}
      hover={hover}
      ref={cardRef}
      className={`${hover ? "hover" : ""}`}
      onClick={handleCardOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-content text-normal-300">
        {GetHighlight(text, keyword)}
        <span className="more-content" />
      </div>
      <div className="bookmark-hr" />
      {!saved && <Overlay hover={hover} />}

      <div className={`${saved ? "card-brand-bookmark" : "card-brand"}`}>
        <span className="brand-icon">
          <img
            src={brandImg}
            alt="brandImg"
          />
          <span className="component-small">{brandName}</span>
        </span>

        {saved ? (
          // 북마크 카드 (이미 저장된 상태)
          <Button
            icon="icon-saved-outline"
            className="button-orange-outline-saved component-small "
            text="저장됨"
            onClick={handleCancelScrap}
          />
        ) : // 홈카드
        hover ? (
          // 호버했을 때 저장된 상태
          // 프론트에서 저장하거나 api에서 저장된 상태로 받는다면
          isLogin &&
          ((savedIdList.length && savedIdList.includes(brandId as any)) ||
            (isScrap && isScrap > 0)) ? (
            <Button
              icon="icon-saved-outline"
              className="button-orange-outline-saved component-small "
              text="저장됨"
            />
          ) : (
            // 호버했을 때 저장안된 상태
            <Button
              icon="icon-saved-white-large"
              className="button-orange component-small"
              text="저장"
              ref={saveBtnRef}
              onClick={handleCopyScrap}
            />
          )
        ) : (
          <></>
        )}
      </div>
    </BrandCardWrapper>
  );
};

export default BrandCard;

const Overlay = styled.div<{ hover: boolean }>`
  position: absolute;
  top: 10.2rem;
  left: 0;
  width: 100%;
  height: 8rem;
  background: ${(props) =>
    props.hover
      ? `linear-gradient(180deg, rgba(255, 248, 246, 0.00) 0%, rgba(255, 248, 246, 0.80) 45.31%, #FFF8F6 100%);`
      : `linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.8) 45.31%,
    #fff 100%
  )`};
`;

export const BrandCardWrapper = styled.div<{
  saved: boolean | undefined;
  hover: boolean;
}>`
  min-width: 37.8rem;
  max-width: 100%;

  min-height: ${(props) => (props.saved ? "auto" : "27.8rem")};
  padding: ${(props) =>
    props.saved ? "3.8rem 4rem" : "3.8rem 4rem 2.6rem 3.8rem"};

  border: 0.025rem solid ${(props) => props.theme.colors.black40};
  border-radius: 2rem;

  background: ${(props) => props.theme.colors.white};
  position: relative;
  cursor: pointer;

  background: ${(props) =>
    props.hover
      ? ` linear-gradient(180deg, rgba(255, 248, 246, 0.00) 0%, rgba(255, 248, 246, 0.80) 45.31%, #FFF8F6 100%), linear-gradient(0deg, rgba(255, 113, 69, 0.05) 0%, rgba(255, 113, 69, 0.05) 100%), #FFF;`
      : `${props.theme.colors.white}`};

  transition: all 0.5s ease-in-out;

  .bookmark-hr {
    width: 100%;
    background-color: $color_black_5;
    border-top: 0.25px solid ${({ theme }) => theme.colors.black30};
    padding-bottom: ${(props) => (props.saved ? "3rem" : "0")};
  }

  .card-content {
    position: relative;

    // 여러 줄 말줄임 표시
    display: -webkit-box;
    -webkit-box-orient: vertical;
    width: 100%;
    white-space: pre-wrap;
    overflow: hidden;
    max-height: ${(props) => (props.saved ? "auto" : "12rem")};
    min-height: 12rem;
    font-size: 1.6rem;
    padding-bottom: ${(props) => (props.saved ? "3rem" : "0")};
    color: ${(props) => props.theme.colors.black100};
    margin-bottom: ${(props) =>
      !props.saved && "2.4rem"}; // 홈카드인 경우에만 2.4rem
    word-break: keep-all;

    // 더보기
    .more-content {
      width: 100%;
      height: 2.4rem;
      position: absolute;
      bottom: 0px;
      text-align: right;
      right: 0;
    }
  }

  .card-brand {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 2.6rem;
    width: calc(100% - 8rem);
    height: 4.6rem;
    justify-content: space-between;

    .brand-icon {
      gap: 1rem;
      display: flex;
      align-items: center;

      img {
        border: 0.025rem solid ${(props) => props.theme.colors.black40};
        border-radius: 50%;
        width: 2.8rem;
        height: 2.8rem;
      }
    }
  }
  .card-brand-bookmark {
    display: flex;
    height: 4.6rem;
    align-items: center;
    width: 100%;

    justify-content: space-between;

    .brand-icon {
      gap: 1rem;
      display: flex;
      align-items: center;

      img {
        width: 2.8rem;
        height: 2.8rem;
      }
    }
  }
`;

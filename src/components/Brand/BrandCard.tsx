import styled from "styled-components";
import {
  brandModalOverlay,
  homeCardLists,
  savedIdLists,
  search,
  searchResult,
  setSaveId,
  staticKeyword,
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
import { scrapCopy } from "@/api/copywriting";
import React from "react";

interface BrandProps {
  text: string;
  brandName: string;
  brandId: number;
  brandImg?: string;
  saved?: boolean;
  srcIdx?: number;
  scrapCnt?: number;
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
  srcIdx,
  brandId,
  saved,
  keyword,
  setSaved,
  onClick,
}: BrandProps) => {
  const [hover, setHover] = useState(false);
  const isLogin = useRecoilValue(isLogined);
  const setToast = useSetRecoilState(toastPopup);
  const setLogin = useSetRecoilState(loginModalOverlay);
  //const keyword = useRecoilValue(search);

  // set
  const setSaveIdList = useSetRecoilState(setSaveId);

  // get
  const savedIdList = useRecoilValue(savedIdLists);

  //console.log("cardId", brandId, "scrapCnt", scrapCnt);

  // TODO: any 수정
  const saveBtnRef = useRef<any>();
  const cardRef = useRef<any>();

  const location = useLocation();

  const handleCopyScrap = async () => {
    // 로그인 안된 상태면 로그인 팝업 출력

    if (!isLogin) {
      // TODO: 로그인 로직
      setLogin(true);
      return;
    }

    console.log("card.cardId", brandId, typeof brandId);
    const data = await scrapCopy({ cardId: brandId });
    if (data.code === 200) {
      console.log("스크랩 결과", brandId, data);
      setToast(true);
      // TODO: 카드 아이디 저장

      setSaveIdList(brandId as any);
    } else if (data.code === 400) {
      alert(data.message);
    }
  };

  const GetHighlight = (text: string) => {
    // TODO: searchState값이 있다면 index값에 따라 주황글씨 처리

    // 상세페이지에서 조회한 경우에만 보이기
    if (location.pathname.includes("search")) {
      //console.log("text", text);

      if (keyword) {
        //console.log("keyword", keyword); // 수십번의

        let find = keyword;
        let regex = new RegExp(find, "g");
        text = text.replace(
          regex,
          `<span class='highlight text-subtitle-2'>${find}</span>`
        );
        //console.log("hightlight text", text);
        const parsedHtml = React.createElement("div", {
          dangerouslySetInnerHTML: { __html: text },
        });
        return parsedHtml;
      }
      return text;
      /*
      text = text.replaceAll("\n", " \n");
      const words = text.split(" ");
      const handleToastOpen = () => setToast(true);
      return srcIdx === undefined || null ? (
        <>
          {words.map((word, index) => {
            return word + " ";
          })}
        </>
      ) : (
        <>
          {words.map((word, index) => {
            return word + " ";
          })}
        </>
      );
      */
    } else {
      return text;
    }
  };

  const handleCardOpen = (e: any) => {
    // 1. 북마크 버튼을 클릭한 경우 동작 안해야 함 return
    // 이벤트가 버튼 ref가 이벤트를 포함하고 있는지 확인
    if (saveBtnRef.current && saveBtnRef.current.contains(e.target)) {
      return;
    }
    // 2. 북마크 버튼이 아닌 다른 곳을 선택한 경우 카피 디테일로 이동
    onClick && onClick();
  };

  return (
    <BrandCardWrapper
      saved={saved}
      ref={cardRef}
      onClick={handleCardOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-content text-normal-300">
        {GetHighlight(text)}
        <span className="more-content" />
      </div>
      <div className="bookmark-hr" />
      {!saved && <Overlay hover={hover} />}

      <div className={`${saved ? "card-brand-bookmark" : "card-brand"}`}>
        <span className="brand-icon">
          <img src={brandImg} alt="brand-image" />
          <span className="component-small">{brandName}</span>
        </span>

        {saved ? (
          // 북마크 카드 (이미 저장된 상태)
          <Button
            icon="icon-saved-outline"
            className="button-orange-outline-saved component-small "
            text="저장됨"
          />
        ) : // 홈카드
        hover ? (
          // 호버했을 때 저장된 상태
          // 프론트에서 저장하거나 api에서 저장된 상태로 받는다면
          savedIdList.includes(brandId as any) || (scrapCnt && scrapCnt > 0) ? (
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

  &:hover {
    background: linear-gradient(
        0deg,
        rgba(255, 113, 69, 0.05) 0%,
        rgba(255, 113, 69, 0.05) 100%
      ),
      #fff;
    border: 0.025rem solid ${(props) => props.theme.colors.point};
  }

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

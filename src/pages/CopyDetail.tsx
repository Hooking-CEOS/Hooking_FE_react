import useOutSideClick from "@/hooks/useOutSideClick";
import styled from "styled-components";
import React, { useRef } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import BrandIcon from "@/components/BrandIcon";
import moment from "moment";
import Button from "@/components/Button";
import { scrapCopy } from "@/api/copywriting";

import {
  selectedCopy,
  isLogined,
  toastPopup,
  similarCopyList,
} from "@/utils/atom";
import BrandCard from "@/components/BrandCard";

interface ICardData {
  id: number;
  text: string;
  brandName: string;
  scrapCnt: number;
  createdAt: string;
  index: number;
}

interface CopyDetailProps {
  onClose: () => void;
}

const CopyDetail = ({ onClose }: CopyDetailProps) => {
  const [similarCopyData, setSimilarCopy] = useRecoilState(similarCopyList);
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCopyData, setSelectedCopy] = useRecoilState(selectedCopy);
  const setLogin = useSetRecoilState(isLogined);
  const isLogin = useRecoilValue(isLogined);
  const setToast = useSetRecoilState(toastPopup);
  const handleClose = () => {
    onClose?.();
  };

  const handleCopyClick = (card: ICardData) => {
    // console.log(card);
    let similarList = [...similarCopyData];
    // console.log(similarList);
    similarList.push(selectedCopyData);
    setSelectedCopy(card);
    setSimilarCopy(similarList.filter((el) => el.id !== card.id));
  };

  const handleCopyScrap = async () => {
    // 로그인 안된 상태면 로그인 팝업 출력
    if (!isLogin) {
      // TODO: 로그인 로직
      setLogin(true);
      return;
    }
    const data = await scrapCopy({ cardId: selectedCopyData.id });
    if (data.code === 200) {
      console.log("스크랩 결과", data);
      //   setIsSaved(true);
      setToast(true);
    } else if (data.code === 400) {
      alert(data.message);
    }
  };

  useOutSideClick(modalRef, handleClose);

  return (
    <CopyDetailContainer ref={modalRef}>
      <SelectedCopyContainer
        brandName={selectedCopyData.brandName}
        className="inArea"
      >
        <div className="imgContainer ">
          <img
            className="imgElement inArea"
            src={require(`../assets/images/brandSearch/brand-search-${selectedCopyData.brandName.replace(
              / /g,
              ""
            )}.png`)}
            alt="brandImg"
          />
          <div className="iconContainer">
            <BrandIcon name={selectedCopyData.brandName} size="small" />
            <span className="component-large brandText">
              {selectedCopyData.brandName}
            </span>
          </div>
        </div>
        <div className="textDiv inArea">
          <div className="textArea text-body-1 inArea">
            {selectedCopyData.text}
            {/* {selectedCopyData.text} */}
          </div>
          <div className="bottomArea">
            <div className="component-caption">
              {moment(selectedCopyData.createdAt).format("YYYY년 M월 D일")}
            </div>
            <Button
              icon="icon-saved-white-large"
              className="button-orange component-small"
              text="저장"
              onClick={handleCopyScrap}
            />
          </div>
        </div>
      </SelectedCopyContainer>
      <MoreCopyContainer>
        <div className="titleText text-heading-2 inArea">
          비슷한 카피 둘러보기
        </div>
        <div className="cardArea inArea">
          {similarCopyData.map((card) => {
            return (
              <BrandCard
                key={card.id}
                text={card.text}
                brandId={card.id}
                brandName={card.brandName}
                brandImg={require(`../assets/images/brandIcon/brand-${card.brandName.replace(
                  / /g,
                  ""
                )}.png`)}
                onClick={() => {
                  handleCopyClick(card);
                }}
                scrapCnt={card.scrapCnt}
              />
            );
          })}
        </div>
      </MoreCopyContainer>
    </CopyDetailContainer>
  );
};

export default CopyDetail;

const CopyDetailContainer = styled.div`
  width: 119rem;
  height: 60rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectedCopyContainer = styled.div<{ brandName: string }>`
  width: 78.7rem;
  height: 60rem;
  background-color: ${(props) => props.theme.colors.white};
  border: 0.025rem slid ${(props) => props.theme.colors.black30};
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  .imgContainer {
    width: 30.7rem;
    height: 100%;
    background-image: url("../assets/images/brandSearch/brand-search-" + brandName.replace(
          // g,
          ""
        ) + ".png")
      no-repeat center;
    .imgElement {
      border-radius: 2rem 0 0 2rem;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .iconContainer {
      position: absolute;
      top: 3.4rem;
      left: 4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1.4rem;
      .brandText {
        color: ${(props) => props.theme.colors.white};
      }
    }
  }
  .textDiv {
    width: 48.7rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 4rem;
    gap: 1rem;

    .textArea {
      overflow: scroll;
      height: 46.5rem;
      word-break: keep-all;
      white-space: pre-wrap;
      /* TODO : 스크롤바 activate 시키기 */
    }
    .textArea::-webkit-scrollbar {
      width: 12px;
      display: default;
    }
    .bottomArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.6rem;
    }
  }
`;

const MoreCopyContainer = styled.div`
  width: 37.8rem;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  top: calc(50vh - 35.5rem);
  .titleText {
    color: white;
    margin-bottom: 1rem;
  }
  .cardArea {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    overflow: scroll;
  }
`;

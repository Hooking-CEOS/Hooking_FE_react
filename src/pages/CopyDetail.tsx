import useOutSideClick from "@/hooks/useOutSideClick";
import styled from "styled-components";
import { useRef } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import BrandIcon from "@/components/Brand/BrandIcon";
import moment from "moment";
import Button from "@/components/Button";
import { scrapCopy } from "@/api/copywriting";
import linkSrc from "@/assets/images/icon-link.svg";

import {
  selectedCopy,
  isLogined,
  toastPopup,
  similarCopyList,
  loginModalOverlay,
  brandModalOverlay,
  setSaveId,
  savedIdLists,
  staticKeyword,
} from "@/utils/atom";
import BrandCard from "@/components/Brand/BrandCard";
import { getBrandByName, removeAllSpace } from "@/utils/util";
import { useNavigate } from "react-router-dom";

interface CopyDetailProps {
  onClose: () => void;
}

const CopyDetail = ({ onClose }: CopyDetailProps) => {
  const Navigate = useNavigate();
  const [similarCopyData, setSimilarCopy] = useRecoilState(similarCopyList);
  const [selectedCopyData, setSelectedCopy] = useRecoilState(selectedCopy);

  const isLogin = useRecoilValue(isLogined);
  const setLoginModal = useSetRecoilState(loginModalOverlay);
  const setToast = useSetRecoilState(toastPopup);
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const setSaveIdList = useSetRecoilState(setSaveId);

  const keyword = useRecoilValue(staticKeyword);

  const modalRef = useRef<HTMLDivElement>(null);
  const savedIdList = useRecoilValue(savedIdLists);

  const handleClose = () => {
    onClose?.();
  };

  const handleCopyClick = (card: any) => {
    let similarList = [...similarCopyData];
    similarList.push(selectedCopyData);
    setSelectedCopy(card);
    setSimilarCopy(similarList.filter((el) => el.id !== card.id));
  };

  const handleCopyScrap = async () => {
    if (!isLogin) {
      setLoginModal(true);
      setBrandModal(false);
      return;
    }
    const data = await scrapCopy({ cardId: selectedCopyData.id });
    console.log(data);
    if (data.response?.status === 400) {
      alert(data.message);
    } else {
      setToast(true);
      setSaveIdList(selectedCopyData.id as any);
    }
  };

  useOutSideClick(modalRef, handleClose, brandModalOverlay);

  return (
    <CopyDetailContainer ref={modalRef}>
      <SelectedCopyContainer
        brandName={removeAllSpace(selectedCopyData.brandName)!}
        className="inArea"
      >
        <div className="imgContainer ">
          <img
            className="imgElement inArea"
            src={require(`../assets/images/brandSearch/brand-search-${removeAllSpace(
              selectedCopyData.brandName
            )}.png`)}
            alt="brandImg"
          />
          <div
            className="iconContainer"
            onClick={() =>
              Navigate(
                `/brand/${getBrandByName(selectedCopyData.brandName).id}`
              )
            }
          >
            <BrandIcon
              name={selectedCopyData.brandName}
              size="small"
            />
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
            <div className="linkBtnDiv">
              <img
                src={linkSrc}
                alt="link"
                className="linkBtn"
                onClick={() => window.open(selectedCopyData.cardLink, "_blank")}
              />
              {/* 저장된 상태라면  */}
              {savedIdList.includes(selectedCopyData.id as any) ||
              selectedCopyData.isScrap > 0 ? (
                <Button
                  icon="icon-saved-outline"
                  className="button-orange-outline-saved component-small "
                  text="저장됨"
                />
              ) : (
                <Button
                  icon="icon-saved-white-large"
                  className="button-orange component-small"
                  text="저장"
                  onClick={handleCopyScrap}
                />
              )}
            </div>
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
                keyword={keyword}
                brandImg={require(`../assets/images/brandIcon/brand-${card.brandName.replace(
                  / /g,
                  ""
                )}.png`)}
                onClick={() => {
                  handleCopyClick(card);
                }}
                isScrap={card.isScrap}
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
    background-image: url("../assets/images/brandSearch/brand-search-" + brandName + ".png")
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

    .textArea::selection {
      user-select: auto !important;
      background: ${({ theme }) => theme.colors.drag};
    }

    .textArea {
      overflow-x: hidden;
      overflow-y: auto;
      height: 46.5rem;
      word-wrap: break-word;
      word-break: keep-all;
      white-space: pre-wrap;

      &::-webkit-scrollbar {
        display: block;
        width: 6px;
        height: 23.3rem;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 2, 53, 0.15);
        //${({ theme }) => theme.colors.black15};
        border-radius: 4px;
      }
    }

    .bottomArea {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.6rem;
      .linkBtnDiv {
        display: flex;
        gap: 1.5rem;
        .linkBtn {
          cursor: pointer;
        }
      }
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

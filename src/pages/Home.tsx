import { useState, useEffect, useRef } from "react";

import Filter from "@/components/Filter";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import Carousel from "@/components/Carousel";

import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  brandModalOverlay,
  checkedFilterList,
  checkedListLen,
  filterCardList,
  sOpenFilter,
  selectedCopy,
  similarCopyList,
} from "@/utils/atom";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import { getAllCopy, getCopyFilter } from "@/api/copywriting";
import { ICardData } from "@/utils/type";
import { removeAllSpace } from "@/utils/util";

import BrandCard from "@/components/Brand/BrandCard";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import useDidMountEffect from "@/hooks/useDidMountEffect";
import Button from "@/components/Button";
import { flexCenter } from "@/styles/theme";
import QnA from "./QnA";

const Home = () => {
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  const filteredData = useRecoilValue(filterCardList);
  const filterLen = useRecoilValue(checkedListLen);
  const setSelectedCopy = useSetRecoilState<ICardData>(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const [renderSkeleton, setRenderSkeleton] = useState(false);
  const setOpenFilter = useSetRecoilState(sOpenFilter);
  const filterCardReady = useRecoilValueLoadable(filterCardList);

  const [emptyResult, setEmptyResult] = useState<boolean>(false);
  const [nomoreData, setNomoreData] = useState<boolean>(false);
  const [ref, inView] = useInView();
  const pageNum = useRef({
    copyNum: 0,
    filterNum: 0,
  });

  const getHomecopy = async () => {
    const { data } = await getAllCopy();
    setCardData(data);
  };

  const getMoreCopy = async (num: number) => {
    const { data } = await getAllCopy(num);
    if (!data) {
      setNomoreData(true);
      return;
    }
    const uniqueData = Array.from(
      new Set([...cardData, ...data].map((item) => JSON.stringify(item)))
      // Parse each item in the set back to an object
    ).map((item) => JSON.parse(item));

    setCardData(uniqueData);
    setRenderSkeleton(false);
    // setHomeCards(data); // 리코일에 저장
  };

  // recoil state에 변화가 생길 때마다 스크롤 카드 시작부분으로 이동
  const checkedList = useRecoilValue(checkedFilterList);

  const { element, onScrollToElement } = useScrollIntoView("auto");

  useDidMountEffect(() => {
    onScrollToElement();
  }, checkedList);

  useEffect(() => {
    //  필터가 초기값인 경우 전체 카피 불러오기
    if (!filterLen) {
      getHomecopy();
    } else {
      if (pageNum.current.filterNum === 0) {
        setCardData(filteredData);
      }
    }

    if (!filteredData.length) {
      setEmptyResult(true);
    } else {
      setEmptyResult(false);
    }
  }, [filteredData]);

  const handleApiCall = async (query: string, target?: ICardData[]) => {
    // home copy api call
    if (cardData.length > 0 && inView) {
      if (query === "home") {
        pageNum.current.copyNum += 1;
        setRenderSkeleton(true);
        await getMoreCopy(pageNum.current.copyNum);
      }
      // filter copy api call
      else {
        const uniqueData = Array.from(
          new Set([...cardData, ...target!].map((item) => JSON.stringify(item)))
        ).map((item) => JSON.parse(item));

        setCardData(uniqueData);
        setRenderSkeleton(false);
      }
    }
  };

  useEffect(() => {
    // TODO : filterLen 분기처리
    console.log("cardData & filteredData", cardData, filteredData);
    if (filterLen && cardData !== filteredData) {
      pageNum.current.filterNum += 1;
      handleApiCall("filter", filteredData);
    } else if (filterLen === 0) {
      handleApiCall("home");
    }
  }, [inView]);

  // 현재 선택된 카피: 카드로 설정
  const handleBrandOpen = (card: ICardData) => {
    setSelectedCopy(card);
    setSimilarCopy(cardData.filter((el) => el.id !== card.id));
    setBrandModal(true);
  };

  return (
    <>
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>
      <section className="main home">
        <Filter />
        <BrandCards ref={element}>
          {cardData && cardData.length > 1 ? (
            cardData.map((card: ICardData) => (
              <BrandCard
                key={card.id}
                text={card.text}
                brandId={card.id}
                brandName={card.brandName}
                brandImg={require(`../assets/images/brandIcon/brand-${removeAllSpace(
                  card.brandName
                )}.png`)}
                onClick={() => handleBrandOpen(card)}
                scrapCnt={card.scrapCnt}
                isScrap={card.isScrap}
              />
            ))
          ) : emptyResult ? (
            <EmptyResult>
              <p className="text-heading-2 empty-text">
                알맞은 카피 결과가 없습니다.
              </p>
              <p className="text-body-1">
                선택한 필터에 맞는 카피를 찾을 수 없습니다. 다른 필터 조합을
                선택해보세요.
              </p>
              <Button
                text="필터 재설정하기"
                onClick={() => console.log("filter reset")}
                className="button-orange big component-small"
              />
            </EmptyResult>
          ) : (
            Array.from({ length: 9 }, () => Array(0).fill(0)).map((el, idx) => (
              <SkeletonCard key={idx} />
            ))
          )}
          {/* 아래 observing div 보이면 다음 api 호출 */}
          {!nomoreData &&
            (renderSkeleton ? (
              Array.from({ length: 3 }, () => Array(0).fill(0)).map(
                (el, idx) => <SkeletonCard key={idx} />
              )
            ) : (
              <div className="observedDiv" ref={ref} />
            ))}
        </BrandCards>
      </section>
      {emptyResult && <QnA copyOnly={true} />}
    </>
  );
};

export default Home;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-top: 3rem;
  .observedDiv {
    width: 100%;
    height: 10px;
    background-color: red;
  }
`;

const FilterWrapper = styled.div`
  max-width: 119.4rem;
  margin: 5.6rem auto 12.8rem auto;
`;

const CarouselDiv = styled.div`
  width: 100%;
  /* height: 360px; */
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(0, 2, 53, 0) 0%,
    rgba(0, 2, 53, 0.03) 100%
  );
`;

const EmptyResult = styled.div`
  width: 119.4rem;
  height: auto;
  margin-top: 6.3rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2rem;
  ${flexCenter}
  flex-direction: column;
  text-align: center;

  .empty-text {
    color: ${({ theme }) => theme.colors.black100} !important;
  }

  .text-body-1 {
    margin-top: 0.8rem;
    color: ${({ theme }) => theme.colors.black40};
  }

  .component-small {
    margin-top: 4.8rem;
  }
`;

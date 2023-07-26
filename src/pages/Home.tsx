import { useState, useEffect } from "react";

import Filter from "@/components/Filter";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import Carousel from "@/components/Carousel";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  brandModalOverlay,
  checkedFilterList,
  checkedListLen,
  filterCardList,
  selectedCopy,
  similarCopyList,
} from "@/utils/atom";
import styled from "styled-components";
import { getAllCopy } from "@/api/copywriting";
import { ICardData } from "@/utils/type";
import { removeAllSpace } from "@/utils/util";

import BrandCard from "@/components/Brand/BrandCard";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import useDidMountEffect from "@/hooks/useDidMountEffect";

const Home = () => {
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  const filteredData = useRecoilValue(filterCardList);
  const filterLen = useRecoilValue(checkedListLen);
  const setSelectedCopy = useSetRecoilState<ICardData>(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);

  const [emptyResult, setEmptyResult] = useState<boolean>(false);

  const getHomecopy = async () => {
    const { data } = await getAllCopy(1);
    setCardData(data);
  };

  // recoil state에 변화가 생길 때마다 스크롤 카드 시작부분으로 이동
  const checkedList = useRecoilValue(checkedFilterList);

  const { element, onScrollToElement } = useScrollIntoView("auto");

  useDidMountEffect(() => {
    onScrollToElement();
  }, checkedList);

  useEffect(() => {
    //  필터가 초기값인 경우 전체 카피 불러오기
    if (!filterLen) getHomecopy();
    else setCardData(filteredData.data);

    if (!filteredData.data.length) {
      setEmptyResult(true);
    } else setEmptyResult(false);
  }, [filteredData]);

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

      <section className="main">
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
              />
            ))
          ) : emptyResult ? (
            <>no Result!!!</>
          ) : (
            Array.from({ length: 9 }, () => Array(0).fill(0)).map((el, idx) => (
              <SkeletonCard key={idx} />
            ))
          )}
        </BrandCards>
      </section>
    </>
  );
};

export default Home;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-top: 3rem;
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

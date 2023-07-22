import BrandCard from "@/components/BrandCard";
import React, { Suspense } from "react";
import Filter from "@/components/Filter";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  brandModalOverlay,
  checkedListLen,
  filterCardList,
  selectedCopy,
  similarCopyList,
} from "@/utils/atom";
import styled from "styled-components";
import Carousel from "@/components/Carousel";
import { useState, useEffect } from "react";
import { getAllCopy } from "@/api/copywriting";

// 미리 불러오는게 아니라 데이터 패칭이 완료되어서 렌더링할 필요가 있을 때 불러옴
//const BrandCard = React.lazy(() => import("@/components/BrandCard"));

interface ICardData {
  id: number;
  text: string;
  brandName: string;
  scrapCnt: number;
  createdAt: string;
  index: number;
}
const Home = () => {
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  const filteredData = useRecoilValue(filterCardList);
  const filterLen = useRecoilValue(checkedListLen);
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);

  const getHomecopy = async () => {
    const { data } = await getAllCopy();
    setCardData(data);
    console.log("home data", data);
  };

  useEffect(() => {
    //  필터가 초기값인 경우 전체 카피 불러오기
    if (!filterLen) getHomecopy();
    // 필터가 선택된 경우 필터카피 불러오기
    else setCardData(filteredData.data);
  }, [filteredData]);

  const handleBrandOpen = (card: ICardData) => {
    console.log("Home handleBrandOpen", card);
    console.log(card);
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
        <Suspense fallback={<div>Loading ...</div>}>
          <Filter />
          <BrandCards>
            {cardData && cardData.length > 1
              ? cardData.map((card) => (
                  <BrandCard
                    key={card.id}
                    text={card.text}
                    brandId={card.id}
                    brandName={card.brandName}
                    brandImg={require(`../assets/images/brandIcon/brand-${card.brandName.replace(
                      / /g,
                      ""
                    )}.png`)}
                    //onClick={handleBrandOpen}
                    scrapCnt={card.scrapCnt}
                  />
                ))
              : Array.from({ length: 9 }, () => Array(0).fill(0)).map(
                  (el, idx) => <SkeletonCard key={idx} />
                )}
          </BrandCards>
        </Suspense>
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

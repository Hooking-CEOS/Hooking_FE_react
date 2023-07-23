import BrandCard from "@/components/Brand/BrandCard";
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
import { ICardData } from "@/utils/type";
import { removeAllSpace } from "@/utils/util";
// 미리 불러오는게 아니라 데이터 패칭이 완료되어서 렌더링할 필요가 있을 때 불러옴
//const BrandCard = React.lazy(() => import("@/components/BrandCard"));

const Home = () => {
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  const filteredData = useRecoilValue(filterCardList);
  const filterLen = useRecoilValue(checkedListLen);
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);

  const [emptyResult, setEmptyResult] = useState<boolean>();

  const getHomecopy = async () => {
    const { data } = await getAllCopy();
    setCardData(data);

    console.log("home data", data.length);

    // setHomeCards(data); // 리코일에 저장
  };

  useEffect(() => {
    //  필터가 초기값인 경우 전체 카피 불러오기
    if (!filterLen) getHomecopy();
    // 필터가 선택된 경우 필터카피 불러오기
    else {
      setCardData(filteredData.data);
      console.log("filteredData", filteredData.data.length);
    }

    if (!filteredData.data.length) {
      setEmptyResult(true);
    } else setEmptyResult(false); // 값이 있으니까 false
  }, [filteredData]);

  const handleBrandOpen = (card: any) => {
    // 현재 선택된 카피: 카드로 설정
    setSelectedCopy(card);

    // 나머지 카피 갈아끼우기
    setSimilarCopy(cardData.filter((el) => el.id !== card.id));

    // 브랜드 모달 띄우기
    setBrandModal(true);
  };

  return (
    <>
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>

      <section className="main">
        <Filter />
        <BrandCards>
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
            <></>
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

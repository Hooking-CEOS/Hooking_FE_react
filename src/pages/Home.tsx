import BrandCard from "@/components/BrandCard";
import Filter from "@/components/Filter";
import { Z_INDEX_MODAL } from "@/utils/constants";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  brandModalOverlay,
  checkedListLen,
  filterCardList,
} from "@/utils/atom";
import styled from "styled-components";
import Carousel from "@/components/Carousel";
import { useState, useEffect } from "react";
import { getAllCopy } from "@/api/copywriting";

interface ICardData {
  id: number;
  text: string;
  brandName: string;
  scrapCnt: number;
  createdAt: string;
}
const Home = () => {
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  const filteredData = useRecoilValue(filterCardList);
  const filterLen = useRecoilValue(checkedListLen);

  const getHomecopy = async () => {
    const { data } = await getAllCopy();
    //console.log("home data", data);
    setCardData(data);
  };

  useEffect(() => {
    //  필터가 초기값인 경우 전체 카피 불러오기
    if (!filterLen) getHomecopy();
    // 필터가 선택된 경우 필터카피 불러오기
    else setCardData(filteredData.data);
  }, [filteredData]);

  const handleBrandOpen = () => setBrandModal(true);

  return (
    <>
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>
      <section className="main">
        <Filter />
        <BrandCards>
          {cardData.length > 1 &&
            cardData.map((card) => (
              <BrandCard
                key={card.id}
                text={card.text}
                brandId={card.id}
                brandName={card.brandName}
                brandImg={require(`../assets/images/brandIcon/brand-${card.brandName}.png`)}
                onClick={handleBrandOpen}
                scrapCnt={card.scrapCnt}
              />
            ))}
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

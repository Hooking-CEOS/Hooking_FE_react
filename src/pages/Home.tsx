import BrandCard from "@/components/BrandCard";
import Filter from "@/components/Filter";
import { Z_INDEX_MODAL } from "@/utils/constants";

import { useRecoilState, useRecoilValue } from "recoil";
import { brandModalOverlay } from "@/utils/atom";
import styled from "styled-components";
import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";
import Carousel from "@/components/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";
const CARD_DATA = [
  {
    idx: 0,
    text: ".찬바람 부는 날, 피부를 탄탄하게!\n\n\n#로열허니프로폴리스인리치배리어크림.\n\n\n블랙비 프로폴리스와 세라-그린콤플렉스가 만나 외부자극에 손상된 피부 장벽을 개선해주고 피부 장벽을 튼튼하게 만들어준답니다.💪🏼☺️진한 텍스처로 피부 보습까지 완벽하게 채워보세요!.#RoyalHoneyPropolisNourish your skin with Skin Food’s extraordinary Propolis lines.#스킨푸드 #탄탄장벽 #꿀찬광채 #꿀찬피부 #프로폴리스 #프로폴리스에센스 #프로폴리스크림 #크림추천",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 1,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 2,
    text: "휴대하기 좋은 비건 세럼 립틴트로\n어디서든 촉촉한 입술을 가꿔보세요\n\nGet moist lips\nwith the portable vegan serum... ",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 3,
    text: "휴대하기 좋은 #비건_세럼_립틴트로\n어디서든 촉촉한 입술을 가꿔보세요\n\nGet moist lips\nwith the portable @vegan_serum...",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 4,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 5,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 6,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 7,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 8,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 9,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 10,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 11,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
];
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

  // test api 연결용
  useEffect(() => {
    axios.get("https://hooking.shop/copy").then((res) => {
      setCardData(res.data.data);
    });
  }, []);

  const handleBrandOpen = () => {
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
          {/* {CARD_DATA.map((card) => (
            <BrandCard
              key={card.idx}
              brandId={card.idx}
              text={card.text}
              brandImg={card.img}
              brandName={card.brand}
              onClick={handleBrandOpen}
            />
          ))} */}

          {cardData.length > 1 &&
            cardData.map((card) => {
              // TODO : brandImg를 이미 구현된 brandIcon 컴포넌트로 대체
              return (
                <BrandCard
                  key={card.id}
                  text={card.text}
                  brandName={card.brandName}
                  brandImg={IMG_BRAND_SAMPLE}
                  onClick={handleBrandOpen}
                />
              );
            })}
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

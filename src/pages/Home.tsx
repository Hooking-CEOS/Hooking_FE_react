import Header from "@/components/Header";

import BrandCard from "@/components/BrandCard";
import Filter from "@/components/Filter";
import { Z_INDEX_MODAL } from "@/utils/constants";

import { useRecoilValue } from "recoil";
import { modalOverlay } from "@/utils/atom";
import styled from "styled-components";
import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";
import Carousel from "@/components/Carousel";
const CARD_DATA = [
  {
    idx: 0,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 1,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 2,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 3,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 4,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 5,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 6,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 7,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
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
const Home = () => {
  const searchFocus = useRecoilValue(modalOverlay);
  return (
    <>
      <Header />
      {searchFocus && <Overlay />}
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>
      <section className="main">
        <Filter />
        <BrandCards>
          {CARD_DATA.map((card) => (
            <BrandCard
              key={card.idx}
              brandId={card.idx}
              text={card.text}
              brandImg={card.img}
              brandName={card.brand}
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: ${Z_INDEX_MODAL};
`;

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
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brand: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
  {
    idx: 3,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
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

const Home = () => {
  const searchFocus = useRecoilValue(modalOverlay);

  return (
    <>
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
  opacity: 0.6;
  z-index: ${Z_INDEX_MODAL};
`;

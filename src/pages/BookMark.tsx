import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";
import BrandCard from "@/components/BrandCard";
import { useEffect } from "react";
import styled from "styled-components";
import { searchModalOverlay, search } from "@/utils/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

const BookMark = () => {
  const CARD_DATA = [
    {
      idx: 0,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
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

  const setOverlay = useSetRecoilState(searchModalOverlay);
  const [searchState, setSearchState] = useRecoilState(search);

  useEffect(() => {
    // 검색창 창닫기
    setSearchState({ ...searchState, searchFocus: false });
    setOverlay(false);
  }, []);

  return (
    <>
      <section className="main bookmark">
        <div className="bookmark-copy">
          <h1 className="text-heading-2">북마크</h1>
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
        </div>
      </section>
    </>
  );
};

export default BookMark;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: auto;
  grid-gap: 3rem;
`;

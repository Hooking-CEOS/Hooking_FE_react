import styled from "styled-components";
import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";
import BrandCard from "@/components/BrandCard";
import Button from "@/components/Button";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";

import { search } from "@/utils/atom";
import { openKaKaoPlus } from "@/utils/util";
import { getAllCopy } from "@/api/copywriting";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { brandModalOverlay } from "@/utils/atom";

interface ICardData {
  id: number;
  text: string;
  brandName: string;
  scrapCnt: number;
  createdAt: string;
}

const QnA = () => {
  const searchState = useRecoilValue(search);
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);

  const [cardData, setCardData] = useState<ICardData[]>([]);

  const getRandomCopy = async () => {
    const { data } = await getAllCopy();
    console.log("qna data", data);
    setCardData(data);
  };

  useEffect(() => {
    getRandomCopy();
  }, []);

  const handleBrandOpen = () => setBrandModal(true);

  return (
    <section className="main qna">
      <div className="qna-search-result">
        <div className="qna-search-result__wrap">
          <h1 className="text-heading-2">
            <span className="text-orange">'{searchState.searchKeyword}'</span>에
            대한 검색 결과가 없습니다.
          </h1>
          <p className="qna-search-result-content text-body-1">
            새로운 뷰티 브랜드의 SNS 홍보 문구를 찾으셨나요?
            <br /> 후킹에서 지속적으로 만나보고 싶은 브랜드가 있다면 아래 버튼을
            눌러 건의해주세요.
          </p>
          <Button
            text="후킹에게 건의하기"
            className="button-orange long component-small"
            onClick={openKaKaoPlus}
          ></Button>
        </div>
      </div>

      <div className="qna-copy">
        <div className="qna-copy__wrap">
          <h1 className="text-heading-2">다른 카피 살펴보기</h1>
          <BrandCards>
            {cardData.length > 0
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
                    onClick={handleBrandOpen}
                    scrapCnt={card.scrapCnt}
                  />
                ))
              : Array.from({ length: 9 }, () => Array(0).fill(0)).map(
                  (el, idx) => <SkeletonCard key={idx} />
                )}
          </BrandCards>
        </div>
      </div>
    </section>
  );
};

export default QnA;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 119.4rem;
  height: auto;
  grid-gap: 3rem;
  place-items: center;
`;

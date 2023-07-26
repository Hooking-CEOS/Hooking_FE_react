import { useEffect, useState } from "react";
import BrandCard from "@/components/Brand/BrandCard";
import Button from "@/components/Button";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";

import styled from "styled-components";
import { getAllCopy } from "@/api/copywriting";
import { openKaKaoPlus, removeAllSpace } from "@/utils/util";
import { useSetRecoilState } from "recoil";
import { brandModalOverlay, selectedCopy, similarCopyList } from "@/utils/atom";
import { ICardData } from "@/utils/type";

const QnA = ({ keyword }: { keyword?: string | null }) => {
  const [cardData, setCardData] = useState<ICardData[]>([]);
  const setBrandModal = useSetRecoilState(brandModalOverlay);
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);

  const getRandomCopy = async () => {
    const { data } = await getAllCopy(1);
    setCardData(data);
  };

  const handleBrandOpen = (card: any) => {
    setSelectedCopy(card);
    setSimilarCopy(cardData.filter((el) => el.id !== card.id));
    setBrandModal(true);
  };

  useEffect(() => {
    getRandomCopy();
  }, []);

  return (
    <section className="main qna">
      <div className="qna-search-result">
        <div className="qna-search-result__wrap">
          <h1 className="text-heading-2">
            <span className="text-orange">'{keyword}'</span>에 대한 검색 결과가
            없습니다.
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
                    brandImg={require(`../assets/images/brandIcon/brand-${removeAllSpace(
                      card.brandName
                    )}.png`)}
                    onClick={() => handleBrandOpen(card)}
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

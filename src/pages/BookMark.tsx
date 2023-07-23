import BrandCard from "@/components/Brand/BrandCard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { searchModalOverlay, search } from "@/utils/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Masonry from "@/components/Masonry";
import { getScrapCopy } from "@/api/copywriting";
import { BookmarkCard } from "@/components/Skeleton/BookmarkCard";
import { ICardData } from "@/utils/type";
import { removeAllSpace } from "@/utils/util";

const BookMark = () => {
  const [card, setCard] = useState<ICardData[]>([]);
  const [noResult, setNoResult] = useState<boolean>();

  const setOverlay = useSetRecoilState(searchModalOverlay);
  const [searchState, setSearchState] = useRecoilState(search);

  const getScrap = async () => {
    const data = await getScrapCopy();
    if (data.code === 200) {
      console.log("북마크 스크랩 데이터 길이", data.data.length);
      setCard(data.data);
      if (!data.data.length) {
        setNoResult(true); // 검색결과 없음
      } else setNoResult(false);
    }
  };

  useEffect(() => {
    // 검색창 창닫기
    setSearchState({ ...searchState, searchFocus: false });
    setOverlay(false);
    getScrap();
  }, []);

  return (
    <>
      <section className="main bookmark">
        <div className="bookmark-copy">
          <h1 className="text-heading-2">북마크</h1>
          {/* 검색결과 없는 경우 */}
          {noResult ? (
            <></>
          ) : (
            <>
              {/* 로딩중인 경우 */}
              {card.length === 0 && (
                <BrandCards>
                  {Array.from({ length: 6 }, () => Array(0)).map((el, idx) => (
                    <BookmarkCard key={`bookmark-skeleton-${idx}`} />
                  ))}
                </BrandCards>
              )}

              {card.length > 0 && (
                <Masonry colCount={2}>
                  {card.map((card) => (
                    <BrandCard
                      saved={true}
                      key={card.id}
                      brandId={card.id}
                      text={card.text}
                      brandImg={require(`../assets/images/brandIcon/brand-${removeAllSpace(
                        card.brandName
                      )}.png`)}
                      brandName={card.brandName}
                    />
                  ))}
                </Masonry>
              )}
            </>
          )}
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

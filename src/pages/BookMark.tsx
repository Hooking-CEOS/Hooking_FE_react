import BrandCard from "@/components/Brand/BrandCard";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  searchModalOverlay,
  search,
  deleteToastPopup,
  recentDeleteCopy,
  restoreCopy,
  deleteSavedId,
  savedIdLists,
  setSaveId,
} from "@/utils/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Masonry from "@/components/Masonry";
import { getScrapCopy } from "@/api/copywriting";
import { BookmarkCard } from "@/components/Skeleton/BookmarkCard";
import { ICardData } from "@/utils/type";
import { removeAllSpace } from "@/utils/util";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { flexCenter } from "@/styles/theme";
const BookMark = () => {
  const [card, setCard] = useState<ICardData[]>([]);
  const [noResult, setNoResult] = useState<boolean>(false);

  const setOverlay = useSetRecoilState(searchModalOverlay);
  const [searchState, setSearchState] = useRecoilState(search);

  const [saved, setDeleteToast] = useRecoilState(deleteToastPopup); // delete 팝업 작동했는지 여부

  const recentCopy = useRecoilValue(recentDeleteCopy);
  const setDeleteSavedId = useSetRecoilState(deleteSavedId);
  const [restore, setRestore] = useRecoilState(restoreCopy);
  const setSavedId = useSetRecoilState(setSaveId);

  const navigate = useNavigate();
  const getScrap = async () => {
    const data = await getScrapCopy();
    if (data.response?.status === 400) {
      alert(data.response.message);
    } else {
      setCard(data);
      if (data.length === 0) setNoResult(true);
      else setNoResult(false);
    }
    // if (data) {
    //   setCard(data);
    // } else {
    //   if (!data) {
    //     setNoResult(true); // 검색결과 없음
    //   } else setNoResult(false);
    // }
  };

  useEffect(() => {
    if (recentCopy.id !== 0) {
      const newCard = card.filter((el) => el.id !== recentCopy.id);
      setCard(newCard);

      if (!newCard.length) setNoResult(true);
      else setNoResult(false);
      setDeleteSavedId(recentCopy.id as any);
    }
  }, [recentCopy]);

  useEffect(() => {
    if (recentCopy.id !== 0) {
      const newCard = [recentCopy, ...card];
      setCard(newCard as any);
      setRestore(false);

      if (!newCard.length) setNoResult(true);
      else setNoResult(false);
      setSavedId(recentCopy.id as any);
    }
  }, [restore]);

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
            <EmptyResult>
              <p className="text-heading-2 empty-text">
                아직 저장한 카피가 없습니다.
                <br />
                마음에 드는 카피 레퍼런스를 저장하여 새로운 아이디어를
                떠올려보세요.
              </p>
              <Button
                text="카피 보러 가기"
                onClick={() => navigate("/home")}
                className="button-orange big component-small"
              />
            </EmptyResult>
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

const EmptyResult = styled.div`
  width: 119.4rem;
  height: 42.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 2rem;
  ${flexCenter}
  flex-direction: column;
  text-align: center;

  .empty-text {
    color: ${({ theme }) => theme.colors.black100} !important;
  }

  .component-small {
    margin-top: 4.8rem;
  }
`;

import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import {
  activeMenu,
  brandModalOverlay,
  selectedCopy,
  similarCopyList,
  staticKeyword,
} from "@/utils/atom";
import BrandCard from "@/components/Brand/BrandCard";
import { ICardData } from "@/utils/type";
import Button from "@/components/Button";
import QnA from "@/pages/QnA";
import { removeAllSpace } from "@/utils/util";
import React from "react";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import { useInView } from "react-intersection-observer";
import {
  getCopySearchByBrandName,
  getCopySearchByCopyText,
  getCopySearchByMoodText,
} from "@/api/copywriting";

const BrandLogoCard = React.lazy(
  () => import("@/components/Brand/BrandLogoCard")
);

type SearchCnt = {
  [key: string]: number;
};

const INITIAL_SEARCH_CNT: SearchCnt = { copy: 0, brand: 0, mood: 0 };

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const setKeyword = useSetRecoilState(staticKeyword);

  const [searchCnt, setSearchCnt] = useState(INITIAL_SEARCH_CNT);
  const [noResult, setNoResult] = useState(true);
  const [type, setType] = useState("copy");
  const [nomoreData, setNomoreData] = useState<boolean>(false);
  const [renderSkeleton, setRenderSkeleton] = useState<boolean>(false);

  const [cardData, setCardData] = useState<ICardData[]>([]);
  const [copyData, setCopyData] = useState<ICardData[]>([]);
  const [brandData, setBrandData] = useState<ICardData[]>([]);
  const [moodData, setMoodData] = useState<ICardData[]>([]);

  // const getSearch = useRecoilValue(searchResult(keyword));
  const [resCnt, setResCnt] = useState<number>();
  const [totalLen, setTotalLen] = useState(0);
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const setBrandModal = useSetRecoilState(brandModalOverlay);
  const setActiveMenuIdx = useSetRecoilState(activeMenu);

  const [ref, inView] = useInView();
  const pageNum = useRef<number>(0);

  const onSetType = (cur: any) => {
    const { copy, brand, mood } = cur;
    let _type = "copy";
    if (brand > 0) {
      _type = "brand";
    } else if (mood > 0) {
      _type = "mood";
    }
    setType(_type);
  };

  const updateSearchCnt = (type: string, cnt: number) => {
    setSearchCnt((prev) => ({ ...prev, [type]: cnt }));
    onSetType({ ...searchCnt, [type]: cnt });
  };

  const getInitialData = async () => {
    setKeyword(keyword!);
    // if brand fetch, no more api fetch needed
    const _brandApiData = await getCopySearchByBrandName(keyword, 0);

    if (_brandApiData.response?.data.code === "RUNTIME_EXCEPTION") {
      const _moodApiData = await getCopySearchByMoodText(keyword, 0);
      const _copyApiData = await getCopySearchByCopyText(keyword, 0);
      if (_moodApiData.response?.data.code === "RUNTIME_EXCEPTION") {
        if (_copyApiData.response?.data.code === "RUNTIME_EXCEPTION") {
          setNoResult(true);
          return;
        } else {
          // copy만 있을 때
          setCopyData(_copyApiData.data);
          setTotalLen(_copyApiData.totalNum);
          setResCnt(_copyApiData.totalNum);
          updateSearchCnt("copy", _copyApiData.totalNum);
          setType("copy");
        }
      } else {
        setMoodData(_moodApiData.data);
        setTotalLen(_moodApiData.totalNum);
        setResCnt(_moodApiData.totalNum);
        updateSearchCnt("mood", _moodApiData.totalNum);
        setType(_moodApiData.type);
      }
    } else {
      // brand data exists
      setNoResult(false);
      console.log("brand data", _brandApiData);
      setBrandData(_brandApiData.data);
      setCardData(_brandApiData.data);
      setType(_brandApiData.type);

      setTotalLen(_brandApiData.totalNum);
      updateSearchCnt(_brandApiData.type, _brandApiData.totalNum);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const handleCardClick = (card: any) => {
    setSelectedCopy(card);
    setSimilarCopy(cardData.filter((el) => el.id !== card.id));
    setBrandModal(true);
  };

  return (
    <>
      {/* || totalLen === 0  */}
      {noResult || !totalLen ? (
        <QnA keyword={keyword} />
      ) : (
        <section className="main qna">
          <div className="qna-copy">
            <div className="qna-copy__wrap">
              <div className="search-result-tab">
                {(searchCnt.copy > 0 || searchCnt.brand > 0) && (
                  <div
                    className="tab-wrap"
                    onClick={() => setType(searchCnt.brand ? "brand" : "copy")}
                  >
                    <Button
                      text="키워드"
                      className={`button-text button-text-${
                        type === "copy" || type === "brand" ? "orange" : "grey"
                      } text-heading-2`}
                    />
                    <span
                      className={`tab-content tab-content-${
                        type === "copy" || type === "brand" ? "orange" : "grey"
                      } component-small`}
                    >
                      {/* {searchCnt.copy || searchCnt.brand} */}
                      {resCnt}
                    </span>
                  </div>
                )}

                <>
                  {searchCnt.mood > 0 && searchCnt.copy > 0 && (
                    <div className="dot" />
                  )}
                  {searchCnt.mood > 0 && (
                    <div
                      className="tab-wrap"
                      onClick={() => {
                        setType("mood");
                      }}
                    >
                      <Button
                        text="카피 무드"
                        className={`button-text button-text-${
                          type === "mood" ? "orange" : "grey"
                        } text-heading-2`}
                      />
                      <span
                        className={`tab-content tab-content-${
                          type === "mood" ? "orange" : "grey"
                        } component-small`}
                      >
                        #{keyword}
                      </span>
                    </div>
                  )}
                </>
              </div>

              {type === "brand" && (
                <>
                  <BrandLogoCard
                    brand={{
                      idx: 0,
                      name: keyword,
                      img: require(`../assets/images/brandSearch/brand-search-${removeAllSpace(
                        keyword!
                      )}.png`),
                    }}
                  />
                  <hr
                    className="hr"
                    style={{ marginBottom: "3rem" }}
                  />
                </>
              )}

              <BrandCards>
                {cardData.map((card) => (
                  <BrandCard
                    key={`brand-text-card-${card.id}`}
                    srcIdx={card.index ?? 0}
                    brandId={card.id}
                    text={card.text}
                    scrapCnt={card.scrapCnt}
                    isScrap={card.isScrap}
                    keyword={keyword!}
                    brandImg={require(`../assets/images/brandIcon/brand-${removeAllSpace(
                      card.brandName
                    )}.png`)}
                    brandName={card.brandName}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
                {!nomoreData &&
                  (renderSkeleton ? (
                    Array.from({ length: 3 }, () => Array(0).fill(0)).map(
                      (el, idx) => <SkeletonCard key={idx} />
                    )
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "red",
                      }}
                      className="observedDiv"
                      ref={ref}
                    />
                  ))}
              </BrandCards>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Search;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 119.4rem;
  height: auto;
  grid-gap: 3rem;
  place-items: center;
`;

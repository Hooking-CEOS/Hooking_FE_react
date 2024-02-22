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

  const [isLoading, setIsLoading] = useState(false);
  const [searchCnt, setSearchCnt] = useState(INITIAL_SEARCH_CNT);
  const [noResult, setNoResult] = useState(true);
  const [type, setType] = useState("copy");
  const [nomoreData, setNomoreData] = useState<boolean>(false);
  const [renderSkeleton, setRenderSkeleton] = useState<boolean>(false);
  const [renderKeyword, setRenderKeyword] = useState<string>("");

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
  const [pageNum, setPageNum] = useState<number[]>([0, 0, 0]);

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
    setIsLoading(true);
    setKeyword(keyword!);
    setRenderKeyword(keyword!);
    // if brand fetch, no more api fetch needed
    const _brandApiData = await getCopySearchByBrandName(keyword, 0);

    if (_brandApiData.response?.data.code === "RUNTIME_EXCEPTION") {
      const _moodApiData = await getCopySearchByMoodText(keyword, 0);
      const _copyApiData = await getCopySearchByCopyText(keyword, 0);
      if (_moodApiData.response?.data.code === "RUNTIME_EXCEPTION") {
        // mood 없음
        if (_copyApiData.response?.data.code === "RUNTIME_EXCEPTION") {
          // 검색결과 없음
          setNoResult(true);
          setTotalLen(0);
          setIsLoading(false);
          setPageNum([-1, -1, -1]);
          return;
        } else {
          // copy만 있을 때
          setNoResult(false);
          // console.log("copy data", _copyApiData);
          setCopyData(_copyApiData.data);
          setTotalLen(_copyApiData.totalNum);
          setResCnt(_copyApiData.totalNum);
          updateSearchCnt("copy", _copyApiData.totalNum);
          setType("copy");
          setIsLoading(false);
          setCardData(_copyApiData.data);
          if (_copyApiData.totalNum >= 30) {
            setPageNum([1, -1, -1]);
          } else {
            setPageNum([-1, -1, -1]);
            setNomoreData(true);
          }
        }
      } else {
        // mood 있음
        setNoResult(false);
        setMoodData(_moodApiData.data);
        setTotalLen(_moodApiData.totalNum);
        updateSearchCnt("mood", _moodApiData.totalNum);
        if (_copyApiData.totalNum) {
          setType("copy");
          setCopyData(_copyApiData.data);
          updateSearchCnt("copy", _copyApiData.totalNum);
          setResCnt(_copyApiData.totalNum);
          setCardData(_copyApiData.data);
          if (_copyApiData.totalNum >= 30) {
            setPageNum([1, -1, 1]);
          } else {
            setPageNum([-1, -1, 1]);
            setNomoreData(true);
          }
        } else {
          setType("mood");
          setResCnt(_moodApiData.totalNum);
          setCardData(_moodApiData.data);
          if (_moodApiData.totalNum >= 30) {
            setPageNum((prev) => {
              prev[2] = 1;
              return prev;
            });
          } else {
            setPageNum((prev) => {
              prev[2] = -1;
              return prev;
            });
          }
        }
        setIsLoading(false);
      }
    } else {
      // brand data exists
      setNoResult(false);
      // console.log("brand data", _brandApiData);
      setBrandData(_brandApiData.data);
      setCardData(_brandApiData.data);
      setType(_brandApiData.type);
      setResCnt(_brandApiData.totalNum);
      setIsLoading(false);
      setTotalLen(_brandApiData.totalNum);
      updateSearchCnt(_brandApiData.type, _brandApiData.totalNum);
      if (_brandApiData.totalNum >= 30) {
        setPageNum((prev) => {
          prev[1] = 1;
          return prev;
        });
      } else {
        setPageNum((prev) => {
          prev[1] = -1;
          return prev;
        });
      }
    }
  };

  const initializeData = () => {
    setCardData([]);
    setCopyData([]);
    setBrandData([]);
    setMoodData([]);
    setType("copy");
    setNoResult(false);
    setPageNum([0, 0, 0]);
    setNomoreData(false);
    setActiveMenuIdx(-1);
  };

  const handleTypeChange = () => {
    if (type === "copy") {
      if (pageNum[0] !== -1) {
        setNomoreData(false);
      } else {
        setNomoreData(true);
      }
      // console.log("handleTypeChange", copyData);
      setCardData(copyData);
      setIsLoading(false);
    } else if (type === "brand") {
      if (pageNum[1] !== -1) {
        setNomoreData(false);
      } else {
        setNomoreData(true);
      }
      setCardData(brandData);
      setIsLoading(false);
    } else if (type === "mood") {
      if (pageNum[2] !== -1) {
        setNomoreData(false);
      } else {
        setNomoreData(true);
      }
      // console.log("handleTypeChange", copyData);
      setCardData(moodData);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // console.log(type, pageNum);
    setIsLoading(true);
    handleTypeChange();
  }, [type]);

  const getCopyMoreData = async () => {
    const _copyApiData = await getCopySearchByCopyText(keyword, pageNum[0]);
    // console.log("copy more data", _copyApiData);

    if (_copyApiData.response?.data.code === "RUNTIME_EXCEPTION") {
      setPageNum((prev) => {
        prev[0] = -1;
        return prev;
      });
      setNomoreData(true);
      return;
    }

    // Combine existing data with new data
    const combinedData = [...copyData, ..._copyApiData.data];

    // Deduplicate based on a unique property, e.g., 'id'
    const uniqueData = Array.from(
      new Map(combinedData.map((item) => [item.id, item])).values()
    );

    // Update state with unique data
    setCopyData(uniqueData);

    setPageNum((prev) => {
      prev[0] += 1;
      return prev;
    });

    setRenderSkeleton(false);
    handleTypeChange();
  };

  const getBrandMoreData = async () => {
    const _brandApiData = await getCopySearchByBrandName(keyword, pageNum[1]);
    // console.log("brand more data", _brandApiData);

    if (_brandApiData.response?.data.code === "RUNTIME_EXCEPTION") {
      setPageNum((prev) => {
        prev[1] = -1;
        return prev;
      });
      setNomoreData(true);
      return;
    }

    // Combine existing data with new data
    const combinedData = [...brandData, ..._brandApiData.data];

    // Deduplicate based on a unique property, e.g., 'id'
    const uniqueData = Array.from(
      new Map(combinedData.map((item) => [item.id, item])).values()
    );

    // Update state with unique data
    setBrandData(uniqueData);

    setPageNum((prev) => {
      prev[1] += 1;
      return prev;
    });

    setRenderSkeleton(false);
    handleTypeChange();
  };

  const getMoodMoreData = async () => {
    const _moodApiData = await getCopySearchByMoodText(keyword, pageNum[2]);
    console.log("mood more data", _moodApiData);

    if (_moodApiData.response?.data.code === "RUNTIME_EXCEPTION") {
      setPageNum((prev) => {
        prev[2] = -1;
        return prev;
      });
      setNomoreData(true);
      return;
    }

    // Combine existing data with new data
    const combinedData = [...moodData, ..._moodApiData.data];

    // Deduplicate based on a unique property, e.g., 'id'
    const uniqueData = Array.from(
      new Map(combinedData.map((item) => [item.id, item])).values()
    );

    // Update state with unique data
    setMoodData(uniqueData);

    setPageNum((prev) => {
      prev[2] += 1;
      return prev;
    });

    setRenderSkeleton(false);
    handleTypeChange();
  };

  useEffect(() => {
    if (pageNum[0] <= 0 && pageNum[1] <= 0 && pageNum[2] <= 0) return;
    if (inView) {
      setRenderSkeleton(true);
      switch (type) {
        case "copy":
          if (pageNum[0] === -1) {
            setNomoreData(true);
            break;
          }
          getCopyMoreData();
          break;
        case "brand":
          if (pageNum[1] === -1) {
            setNomoreData(true);
            return;
          }
          getBrandMoreData();
          break;
        case "mood":
          if (pageNum[2] === -1) {
            setNomoreData(true);
            return;
          }
          getMoodMoreData();
          break;
      }
    }
  }, [inView]);

  useEffect(() => {
    initializeData();
    getInitialData();
  }, [keyword]);

  const handleCardClick = (card: any) => {
    setSelectedCopy(card);
    setSimilarCopy(cardData.filter((el) => el.id !== card.id));
    setBrandModal(true);
  };

  return (
    <>
      {/* || totalLen === 0  */}
      {noResult || !totalLen ? (
        <QnA keyword={renderKeyword} />
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
                        #{renderKeyword}
                      </span>
                    </div>
                  )}
                </>
              </div>

              {!isLoading && type === "brand" && (
                <>
                  <BrandLogoCard
                    brand={{
                      idx: 0,
                      name: renderKeyword,
                      img: require(`../assets/images/brandSearch/brand-search-${removeAllSpace(
                        renderKeyword
                      )}.png`),
                    }}
                  />
                  <hr
                    className="hr"
                    style={{ marginBottom: "3rem" }}
                  />
                </>
              )}
              {!isLoading && (
                <BrandCards>
                  {cardData.map((card) => (
                    <BrandCard
                      key={`brand-text-card-${card.id}`}
                      srcIdx={card.index ?? 0}
                      brandId={card.id}
                      text={card.text}
                      scrapCnt={card.scrapCnt}
                      isScrap={card.isScrap}
                      keyword={renderKeyword}
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
              )}
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

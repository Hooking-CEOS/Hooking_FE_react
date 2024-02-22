// TODO: Cannot read properties of undefined (reading 'length') 에러 해결하기
// api 호출시에 더이상 없으면 나오는듯?

import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef, lazy } from "react";

import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import QnA from "@/pages/QnA";
import {
  activeMenu,
  brandModalOverlay,
  selectedCopy,
  similarCopyList,
  staticKeyword,
} from "@/utils/atom";
import { ICardData } from "@/utils/type";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import { removeAllSpace } from "@/utils/util";
import BrandCard from "@/components/Brand/BrandCard";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";

import {
  getCopySearchByBrandName,
  getCopySearchByCopyText,
  getCopySearchByMoodText,
} from "@/api/copywriting";

type DataType = "brand" | "text" | "mood";

const BrandLogoCard = lazy(() => import("@/components/Brand/BrandLogoCard"));

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const setKeyword = useSetRecoilState<string>(staticKeyword);
  const [renderKeyword, setRenderKeyword] = useState<string>("");

  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const setBrandModal = useSetRecoilState(brandModalOverlay);
  const setActiveMenuIdx = useSetRecoilState(activeMenu);

  const [noResult, setNoResult] = useState<boolean>(false);
  const [nomoreData, setNomoreData] = useState<boolean>(false);
  const [renderSkeleton, setRenderSkeleton] = useState<boolean>(false);
  const [type, setType] = useState<DataType>("text"); // "text" | "brand" | "mood

  const [textData, setTextData] = useState<ICardData[]>([]);
  const [brandData, setBrandData] = useState<ICardData[]>([]);
  const [moodData, setMoodData] = useState<ICardData[]>([]);
  const [resCnt, setResCnt] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView();

  const randomSeed = useRef({
    text: 0,
    brand: 0,
    mood: 0,
  });

  const pageNum = useRef({
    text: 0,
    brand: 0,
    mood: 0,
  });

  useEffect(() => {
    initializeData();
    getInitialData();
  }, [keyword]);

  useEffect(() => {
    setIsLoading(true);
    if (keyword !== renderKeyword) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [keyword, renderKeyword, type]);

  useEffect(() => {
    console.log(type, pageNum.current[type]);
    if (pageNum.current[type] === -1) {
      setNomoreData(true);
      return;
    } else {
      setNomoreData(false);
    }
  }, [type]);

  useEffect(() => {
    console.log(pageNum.current, randomSeed.current);
    if (
      pageNum.current.brand <= 0 &&
      pageNum.current.mood <= 0 &&
      pageNum.current.text <= 0
    )
      return;
    if (inView) {
      setRenderSkeleton(true);
      getMoreData();
    }
  }, [inView]);

  const getMoreData = async () => {
    // Return early if there's no more data to fetch
    if (nomoreData) {
      setRenderSkeleton(false);
      return;
    }

    // Fetch data based on the current type and keyword
    const data = await fetchData(keyword || "", type);
    if (!data || data.data.length === 0) {
      setNomoreData(true);
      setRenderSkeleton(false);
      return;
    }

    const updateDataState = (
      currentData: ICardData[],
      newData: ICardData[]
    ) => {
      const currentDataSet = new Set(currentData);
      newData.forEach((item: ICardData) => currentDataSet.add(item));
      return Array.from(currentDataSet); // TODO: check if no duplication happening
    };

    // Mapping from type to its corresponding state updater function
    const stateUpdaterMap = {
      brand: setBrandData,
      mood: setMoodData,
      text: setTextData,
    };

    // Use the correct state updater function based on the type
    const setState = stateUpdaterMap[type];
    if (setState) {
      setState((currentData) => updateDataState(currentData, data.data));
    }

    randomSeed.current[type] = data.randomSeed;
    setRenderSkeleton(false);
    setResCnt((prevResCnt) => prevResCnt + data.data.length);
  };

  const initializeData = () => {
    setKeyword(keyword || "");
    setRenderKeyword(keyword || "");
    setTextData([]);
    setBrandData([]);
    setMoodData([]);
    setType("text");
    setActiveMenuIdx(-1);
    setNoResult(false);
    setNomoreData(false);
    pageNum.current = {
      text: 0,
      brand: 0,
      mood: 0,
    };
    randomSeed.current = {
      text: 0,
      brand: 0,
      mood: 0,
    };
  };

  const fetchData = async (
    keyword: string,
    type: "brand" | "mood" | "text"
  ) => {
    try {
      const response = await {
        brand: () =>
          getCopySearchByBrandName(
            keyword,
            pageNum.current.brand,
            randomSeed.current.brand
          ),
        mood: () =>
          getCopySearchByMoodText(
            keyword,
            pageNum.current.mood,
            randomSeed.current.mood
          ),
        text: () =>
          getCopySearchByCopyText(
            keyword,
            pageNum.current.text,
            randomSeed.current.text
          ),
      }[type]();

      if (response.response?.data.message === "해당 결과를 찾을 수 없습니다.") {
        pageNum.current[type] = -1;
        throw new Error("NoData");
      }
      pageNum.current[type] += 1;
      return {
        data: response.data,
        randomSeed: response.randomSeed,
        totalNum: response.totalNum,
      };
    } catch (error) {
      return null;
    }
  };

  const updateStateForType = (data: any, type: "brand" | "mood" | "text") => {
    setNoResult(false);
    setIsLoading(false);

    if (data.totalNum < 30) {
      setNomoreData(true);
      pageNum.current[type] = -1;
    }

    setType(type);
    randomSeed.current[type] = data.randomSeed;
    setResCnt(data.totalNum);

    const setterMap = {
      brand: setBrandData,
      mood: setMoodData,
      text: setTextData,
    };

    setterMap[type](data.data);
  };

  const getInitialData = async () => {
    setIsLoading(true);

    const brandData = await fetchData(keyword || "", "brand");
    if (brandData) {
      updateStateForType(brandData, "brand");
      return;
    }

    const [moodData, textData] = await Promise.all([
      fetchData(keyword || "", "mood"),
      fetchData(keyword || "", "text"),
    ]);

    if (!moodData && !textData) {
      setNoResult(true);
      setNomoreData(true);
      setIsLoading(false);
      return;
    }
    if (moodData) {
      updateStateForType(moodData, "mood");
    }

    if (textData) {
      updateStateForType(textData, "text");
    }
  };

  const handleClick = (type: DataType) => (card: ICardData) => {
    setSelectedCopy(card);
    setBrandModal(true);

    const dataMap: Record<DataType, ICardData[]> = {
      brand: brandData,
      text: textData,
      mood: moodData,
    };

    const data = dataMap[type] || [];
    setSimilarCopy(data.filter((el) => el.id !== card.id));
  };

  const handleCardClick = handleClick(type);

  const renderCard = (card: ICardData) => {
    return (
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
    );
  };
  return (
    <>
      {noResult ? (
        <QnA keyword={keyword} />
      ) : (
        <section className="main qna">
          <div className="qna-copy">
            <div className="qna-copy__wrap">
              <div className="search-result-tab">
                {(brandData.length > 0 || textData.length > 0) && (
                  <div
                    className="tab-wrap"
                    onClick={() =>
                      setType(brandData.length > 0 ? "brand" : "text")
                    }
                  >
                    <Button
                      text="키워드"
                      className={`button-text button-text-${
                        type === "text" || type === "brand" ? "orange" : "grey"
                      } text-heading-2`}
                    />
                    <span
                      className={`tab-content tab-content-${
                        type === "text" || type === "brand" ? "orange" : "grey"
                      } component-small`}
                    >
                      {resCnt}
                    </span>
                  </div>
                )}
                <>
                  {moodData.length > 0 && textData.length > 0 && (
                    <div className="dot" />
                  )}
                  {moodData.length > 0 && (
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
                        renderKeyword!
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
                  {type === "text"
                    ? textData.map((card) => {
                        return renderCard(card);
                      })
                    : type === "brand"
                    ? brandData.map((card) => {
                        return renderCard(card);
                      })
                    : moodData.map((card) => {
                        return renderCard(card);
                      })}
                  {!nomoreData &&
                    (renderSkeleton ? (
                      Array.from({ length: 3 }, () => Array(0).fill(0)).map(
                        (_, idx) => <SkeletonCard key={idx} />
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

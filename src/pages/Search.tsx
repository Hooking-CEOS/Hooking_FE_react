import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  brandModalOverlay,
  searchResult,
  selectedCopy,
  similarCopyList,
} from "@/utils/atom";
import BrandCard from "@/components/BrandCard";

import IMG_BRAND_SAMPLE from "@/assets/images/brandSearch/brand-search-logo.png";
import Button from "@/components/Button";
import QnA from "@/pages/QnA";
import BrandLogoCard from "@/components/BrandLogoCard";

const CARD_DATA = [
  {
    id: 0,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 1,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 2,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 3,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 4,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 5,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 6,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 7,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },

  {
    id: 8,
    text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
    brandName: "이니스프리",
    img: IMG_BRAND_SAMPLE,
  },
];

type SearchCnt = {
  [key: string]: number;
};

const INITIAL_SEARCH_CNT: SearchCnt = { copy: 0, brand: 0, mood: 0 };

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const [tab, setTab] = useState(0); // 키워드탭: 0, 카피무드탭: 1
  const [searchCnt, setSearchCnt] = useState(INITIAL_SEARCH_CNT);
  const [noResult, setNoResult] = useState(false);
  const [type, setType] = useState("copy");
  const [card, setCard] = useState<ICardData[]>([]);

  const keyword = searchParams.get("keyword");
  const getSearch = useRecoilValue(searchResult(keyword));
  const [totalLen, setTotalLen] = useState(0);
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const setBrandModal = useSetRecoilState(brandModalOverlay);

  const getTotalLen = (keywordObj: SearchCnt) => {
    const totalLen = Object.keys(keywordObj)
      .map((keyword) => keywordObj[keyword])
      .reduce((acc, val) => acc + val, 0);

    setTotalLen(totalLen);
  };

  // curType을 설정하는 함수
  const onSetType = (cur: any) => {
    // cur: { copy: 0, brand: 0, mood: 0 };
    const { copy, brand, mood } = cur;
    let type = "mood"; // default
    if (brand > 0) {
      type = "brand";
    } else if (copy > 0) {
      type = "copy";
    }
    setType(type);
    return type;
  };

  // 각 타입별 결과 데이터 개수를 반환하는 함수
  const getTypeSearchCnt = ({ data }: any): string => {
    const cur: any = { ...INITIAL_SEARCH_CNT };
    data.forEach((obj: any) => {
      if (obj.data !== null && obj.data !== undefined) {
        cur[obj.type] = obj.data.length;
      }
    });
    setSearchCnt(cur);
    getTotalLen(cur); // 총 개수 설정
    return onSetType(cur);
  };

  interface commonAPIResponseType {
    code: number;
    messages: string;
  }

  interface ICardData {
    id: number;
    text: string;
    brandName: string;
    scrapCnt: number;
    createdAt: string;
    index: number;
  }

  interface KeywordType {
    type: string;
    data: ICardData[];
  }

  // TODO: 공통 res type 만들기
  interface searchAPIResponseType extends commonAPIResponseType {
    data: KeywordType[];
  }

  const getSearchResult = () => {
    const data: searchAPIResponseType = getSearch;
    // 400: no search result
    if (data.code === 200) {
      setNoResult(false);
      const type = getTypeSearchCnt(data);
      if (data.data && data.data.length > 0) {
        setType(data.data[0].type);
      }
      getTypeData(data, type); // 데이터들의 대표 타입을 통해 카드 데이터 렌더링
    } else if (data.code === 400) {
      setNoResult(true);
    }
  };

  const handleBrandOpen = (cardData: any) => {
    console.log(cardData);
    setSelectedCopy(cardData);
    setSimilarCopy(card.filter((el) => el.id !== cardData.id));
    setBrandModal(true);
  };

  useEffect(() => {
    getSearchResult();
  }, [keyword]);

  console.log("getSearch", getSearch);
  console.log("searchCnt", searchCnt);

  // 탭이 여러 개일 경우 현재 누른 탭에 따라 카드 데이터 갈아끼움
  const getTypeData = ({ data }: any, findType: string) => {
    data?.map((obj: any) => {
      const { type } = obj;
      //console.log("type", type);
      if (type === findType) {
        setCard(obj.data);
        console.log("[obj.data]", obj.data);
      }
    });
  };

  /* TODO: qna 말고, copy로 빼기 */

  useEffect(() => {
    getTypeData(getSearch, type);
  }, [type]);

  return (
    <>
      {/* || totalLen === 0  */}
      {noResult || totalLen === 0 ? (
        <QnA />
      ) : (
        <section className="main qna">
          <div className="qna-copy">
            <div className="qna-copy__wrap">
              <div className="search-result-tab">
                {(searchCnt.copy > 0 || searchCnt.brand > 0) && (
                  <div
                    className="tab-wrap"
                    onClick={() =>
                      setType(searchCnt.brand > 0 ? "brand" : "copy")
                    }
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
                      {searchCnt.copy || searchCnt.brand}
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
                      onClick={() => setType("mood")}
                    >
                      <Button
                        text="카피 무드"
                        className={`button-text button-text-${
                          type === "mood" ? "orange" : "grey"
                        } text-heading-2`}
                      />
                      {searchCnt.mood === 0 ? (
                        <span
                          className={`tab-content tab-content-${
                            type === "mood" ? "orange" : "grey"
                          } component-small`}
                        >
                          {searchCnt.mood}
                        </span>
                      ) : (
                        <span
                          className={`tab-content tab-content-${
                            type === "mood" ? "orange" : "grey"
                          } component-small`}
                        >
                          #{keyword}
                        </span>
                      )}
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
                      img: require(`../assets/images/brandSearch/brand-search-미샤.png`),
                    }}
                  />
                  <hr
                    className="hr"
                    style={{ marginBottom: "3rem" }}
                  />
                </>
              )}

              <BrandCards>
                {/* 데이터만 갈아끼우기 */}
                {/* TODO: idx값이랑 target 넘겨주고 주황글씨 처리해야함 */}
                {card.map((card) => {
                  return (
                    <BrandCard
                      key={`brand-text-card-${card.id}`}
                      srcIdx={card.index ?? 0}
                      brandId={card.id}
                      text={card.text}
                      brandImg={require(`../assets/images/brandIcon/brand-${card.brandName}.png`)}
                      brandName={card.brandName}
                      onClick={() => handleBrandOpen(card)}
                    />
                  );
                })}
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

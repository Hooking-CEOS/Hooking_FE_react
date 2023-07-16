import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { searchResult } from "@/utils/atom";
import BrandCard from "@/components/BrandCard";

import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";
import Button from "@/components/Button";
import QnA from "@/pages/QnA";
import BrandLogoCard from "@/components/BrandLogoCard";

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

type SearchCnt = {
  [key: string]: number;
};

const INITIAL_SEARCH_CNT: SearchCnt = { copy: 0, brand: 0, mood: 0 };

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const [tab, setTab] = useState(0); // 키워드탭: 0, 카피무드탭: 1
  const [searchCnt, setSearchCnt] = useState(INITIAL_SEARCH_CNT);

  const keyword = searchParams.get("keyword");
  const getSearch = useRecoilValue(searchResult(keyword));

  const getTotalLen = (keywordObj: SearchCnt): number =>
    Object.keys(keywordObj)
      .map((keyword) => keywordObj[keyword])
      .reduce((acc, val) => acc + val, 0);

  // 각 타입별 결과 데이터 개수를 반환하는 함수
  const getTypeSearchCnt = ({ data }: any) => {
    const cur: any = { ...INITIAL_SEARCH_CNT };
    data.map((obj: any) => {
      if (obj.data !== null && obj.data !== undefined) {
        cur[obj.type] = obj.data.length;
      }
    });
    setSearchCnt(cur);
  };

  interface commonAPIResponseType {
    code: number;
    messages: string;
  }

  // TODO: 공통 res type 만들기
  interface searchAPIResponseType extends commonAPIResponseType {
    data: {
      [key: string]: Array<null | string>;
    };
  }
  const getSearchResult = () => {
    const data: searchAPIResponseType = getSearch;
    if (data.code === 200) {
      getTypeSearchCnt(data);
    }
  };

  useEffect(() => {
    getSearchResult();
  }, [keyword]);

  /* TODO: qna 말고, copy로 빼기 */

  const BRAND = [
    {
      idx: 0,
      name: "롱테이크",
      img: require("../assets/images/img-brand-sample.png"),
    },
    {
      idx: 1,
      name: "애프터블로우",
      img: require("../assets/images/img-brand-sample.png"),
    },
    /*
    {
      idx: 2,
      name: "려",
      img: require("../assets/images/img-brand-sample.png"),
    },
    */
  ];

  return (
    <>
      {getTotalLen(searchCnt) === 0 ? (
        <QnA />
      ) : (
        <section className="main qna">
          <div className="qna-copy">
            <div className="qna-copy__wrap">
              <div className="search-result-tab">
                <div
                  className="tab-wrap"
                  onClick={() => setTab(0)}
                >
                  <Button
                    text="키워드"
                    className={`button-text button-text-${
                      tab === 0 ? "orange" : "grey"
                    } text-heading-2`}
                  />
                  <span
                    className={`tab-content tab-content-${
                      tab === 0 ? "orange" : "grey"
                    } component-small`}
                  >
                    {searchCnt.copy}
                  </span>
                </div>
                <div className="dot" />
                <div
                  className="tab-wrap"
                  onClick={() => setTab(1)}
                >
                  <Button
                    text="카피 무드"
                    className={`button-text button-text-${
                      tab === 1 ? "orange" : "grey"
                    } text-heading-2`}
                  />
                  {/* 카피 무드 없는 경우는 0, 있으면 해시태그 */}
                  {searchCnt.mood === 0 ? (
                    <span
                      className={`tab-content tab-content-${
                        tab === 1 ? "orange" : "grey"
                      } component-small`}
                    >
                      {searchCnt.mood}
                    </span>
                  ) : (
                    <span
                      className={`tab-content tab-content-${
                        tab === 1 ? "orange" : "grey"
                      } component-small`}
                    >
                      #퓨어한
                      {/** TODO: mood 어떻게 오는지 보고 뿌리기 */}
                    </span>
                  )}
                </div>
              </div>
              {searchCnt.brand > 0 && (
                <>
                  {BRAND.map((brand) => (
                    <BrandLogoCard
                      key={`brand-card-${brand.idx}`}
                      brand={brand}
                    />
                  ))}
                  <hr
                    className="hr"
                    style={{ marginBottom: "3rem" }}
                  />
                </>
              )}
              <BrandCards>
                {CARD_DATA.map((card) => (
                  <BrandCard
                    key={`brand-text-card-${card.idx}`}
                    brandId={card.idx}
                    text={card.text}
                    brandImg={card.img}
                    brandName={card.brand}
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

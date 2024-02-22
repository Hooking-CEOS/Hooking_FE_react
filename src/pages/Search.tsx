import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import QnA from "./QnA";
import { staticKeyword } from "@/utils/atom";
import { ICardData } from "@/utils/type";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button";
import { removeAllSpace } from "@/utils/util";

// import {
//   getCopySearchByBrandName,
//   getCopySearchByCopyText,
//   getCopySearchByMoodText,
// } from "@/api/copywriting";

const BrandLogoCard = React.lazy(
  () => import("@/components/Brand/BrandLogoCard")
);

const Search = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const setKeyword = useSetRecoilState<string>(staticKeyword);
  const [renderKeyword, setRenderKeyword] = useState<string>("");

  const [noResult, setNoResult] = useState(false);
  const [type, setType] = useState<"text" | "brand" | "mood">("text"); // "text" | "brand" | "mood

  const [textData, setTextData] = useState<ICardData[]>([]);
  const [brandData, setBrandData] = useState<ICardData[]>([]);
  const [moodData, setMoodData] = useState<ICardData[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView();
  const pageNum = useRef({
    text: 1,
    brand: 1,
    mood: 1,
  });

  useEffect(() => {
    initializeData();
  }, [keyword]);

  useEffect(() => {
    setIsLoading(true);
    if (keyword !== renderKeyword) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [keyword, renderKeyword, type]);

  const initializeData = () => {
    setKeyword(keyword || "");
    setRenderKeyword(keyword || "");
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
                      {brandData.length > 0
                        ? brandData.length
                        : textData.length}
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

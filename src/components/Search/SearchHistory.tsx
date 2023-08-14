import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import BrandLogoCard from "@/components/Brand/BrandLogoCard";

import styled from "styled-components";
import { useRecoilValue } from "recoil";

import { getBrandNameById, getRandomNum } from "@/utils/util";
import { Z_INDEX_FILTER } from "@/utils/constants";
import { isBigWindow } from "@/utils/atom";

const SearchHistory = () => {
  const navigate = useNavigate();

  const [nameArr, setNameArr] = useState<any>();

  const location = useLocation();
  const bigWindow = useRecoilValue(isBigWindow);

  const goToBookMark = () => {
    if (location.pathname === "/bookmark") window?.location.reload();
    else navigate("/bookmark");
  };

  // num 개수 만큼의 브랜드 리턴
  const getRandNumBrand = (num: number) => {
    const brandRandomIdArr: number[] = [];
    while (num) {
      const randNum = getRandomNum(1, 28);

      if (brandRandomIdArr.indexOf(randNum) === -1) {
        brandRandomIdArr.push(randNum);
        num--;
      }
    }
    const nameArr = brandRandomIdArr.map((arr) => getBrandNameById(arr));
    setNameArr(nameArr);
  };

  useEffect(() => {
    // 큰 화면 (1320) 이상에서는 3개 브랜드 생성, 작은 화면은 2개 생성
    getRandNumBrand(bigWindow ? 3 : 2);
  }, [bigWindow]);

  return (
    <SearchHistoryWrapper>
      <div className="search-history__wrap">
        <div className="search-brand">
          <h2 className="text-subtitle-1">이달의 브랜드 모아보기</h2>
          <div className="search-brand-content">
            {nameArr &&
              nameArr.length > 0 &&
              nameArr.map((brandName: any, idx: any) => (
                <BrandLogoCard
                  key={`brand-card-${brandName}-${idx}}`}
                  brand={{
                    idx: idx,
                    name: brandName,
                    img: require(`../../assets/images/brandSearch/brand-search-${brandName.replace(
                      / /g,
                      ""
                    )}.png`),
                  }}
                  onClick={() => getRandNumBrand(bigWindow ? 3 : 2)}
                />
              ))}
          </div>
        </div>
        <hr className="hr" />
        <div className="search-copy">
          <h2
            className="text-headline text-subtitle-1"
            style={{ display: "inline-flex" }}
          >
            이전에 저장한 카피를 찾고 싶으신가요?
          </h2>
          <Button
            text="내 북마크"
            onClick={goToBookMark}
            className="button-orange-outline text-subtitle-1"
          />
        </div>
      </div>
    </SearchHistoryWrapper>
  );
};

export default React.memo(SearchHistory);

const SearchHistoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 55.5rem;
  max-width: 100.9rem;
  cursor: default;

  border: 0.5px solid ${({ theme }) => theme.colors.black30};
  border-radius: 0 0 2rem 2rem;
  background: linear-gradient(
      0deg,
      rgba(242, 242, 242, 0.7) 0%,
      rgba(242, 242, 242, 0.7) 100%
    ),
    #fff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  padding: 4rem 5.8rem 2.5rem 5.8rem;
  z-index: ${Z_INDEX_FILTER};

  .search-history__wrap {
    .search-brand {
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      .search-brand-content {
        display: flex;
      }
    }

    .search-copy {
      display: flex;
      align-items: center;
      .text-headline {
        flex: 1;
      }
    }
  }
`;

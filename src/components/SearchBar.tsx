import { useRef, useEffect, useState, useMemo } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useOutSideClick from "@/hooks/useOutSideClick";

import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";

import { searchModalOverlay, search } from "@/utils/atom";
import { BRAND_TO_BRANDID, Z_INDEX_FILTER } from "@/utils/constants";
import BrandLogoCard from "./Brand/BrandLogoCard";
import { useLocation } from "react-router-dom";
import { isBigWindow } from "@/utils/atom";
import { debounce } from "lodash";

const SearchBar = () => {
  const navigate = useNavigate();
  const setOverlay = useSetRecoilState(searchModalOverlay);

  const [searchState, setSearchState] = useRecoilState(search);

  // 내부 state keyword
  const [keyword, setKeyword] = useState<string>(searchState.searchKeyword);

  const [searchParams, _] = useSearchParams();
  const urlKeyword = searchParams.get("keyword");

  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrap = useRef<HTMLInputElement>(null);

  const [nameArr, setNameArr] = useState<any>();

  const location = useLocation();
  const bigWindow = useRecoilValue(isBigWindow);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  // 검색창 focus in
  const handleFocusOn = () => {
    setSearchState({ ...searchState, searchFocus: true });
    setOverlay(true);
    searchRef.current?.focus();
  };

  const handleFocusOut = () => {
    setSearchState({ ...searchState, searchFocus: false });
    setOverlay(false);
  };

  useOutSideClick(searchWrap, handleFocusOut, searchState.searchFocus);

  useEffect(() => {
    setKeyword(keyword.trim());
  }, [urlKeyword]);

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimKeyword = keyword?.trim();

    if (trimKeyword === "") return;

    setSearchState({ ...searchState, searchKeyword: trimKeyword });
    navigate(`/search?keyword=${trimKeyword}`);
    handleFocusOut();
    searchRef.current?.blur();
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      setSearchState({ ...searchState, searchKeyword: "" });
      setKeyword("");
    }
  }, [location.pathname]);

  const getBrandNameById = (id: number): string | undefined => {
    const brand = BRAND_TO_BRANDID.find(
      (brandObj) => brandObj.api_id === id.toString()
    );
    return brand?.name_kr;
  };

  const handleBookMark = () => {
    if (location.pathname === "/bookmark") window?.location.reload();
    else navigate("/bookmark");
  };

  const getRandomNum = (min: number, max: number) => {
    const randNum: number = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
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
    <>
      <SearchBarWrapper ref={searchWrap} onClick={handleFocusOn}>
        <form
          onSubmit={onSearchSubmit}
          className={`${
            searchState.searchFocus
              ? "searchbar__wrap active"
              : "searchbar__wrap"
          }`}
        >
          <span
            onClick={() => window.location.reload()}
            className={`icon icon-${
              searchState.searchFocus ? "hooking" : "search"
            }`}
          />
          <Input
            type="text"
            placeholder={`${
              searchState.searchFocus
                ? ""
                : "브랜드 이름, 분위기 등으로 검색해보세요"
            }`}
            className={`${
              searchState.searchFocus
                ? "searchbar searchbar--active"
                : "searchbar"
            } text-subtitle-1`}
            onChange={handleSearch}
            onFocus={handleFocusOn}
            value={keyword || ""}
            ref={searchRef}
          />
          {searchState.searchFocus && (
            <Button
              type="submit"
              width="1.9rem"
              text=""
              className="icon icon-search"
            />
          )}
        </form>

        {searchState.searchFocus && (
          <>
            <SearchHistory>
              <div className="search-history__wrap">
                <div className="search-brand">
                  <div className="text-subtitle-1">이달의 브랜드 모아보기</div>
                  <div className="search-brand-content">
                    {nameArr &&
                      nameArr.length > 0 &&
                      nameArr.map((brandName: any, idx: any) => (
                        <BrandLogoCard
                          key={`brand-card-${brandName}-${idx}}`}
                          brand={{
                            idx: idx,
                            name: brandName,
                            img: require(`../assets/images/brandSearch/brand-search-${brandName.replace(
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
                  <div
                    className="text-headline text-subtitle-1"
                    style={{ display: "inline-flex" }}
                  >
                    이전에 저장한 카피를 찾고 싶으신가요?
                  </div>
                  <Button
                    text="내 북마크"
                    onClick={handleBookMark}
                    className="button-orange-outline text-subtitle-1"
                  />
                </div>
              </div>
            </SearchHistory>
          </>
        )}
      </SearchBarWrapper>
    </>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 55.5rem;
  max-width: 100.9rem;
  height: 5.4rem;
  cursor: text;

  .searchbar__wrap {
    display: flex;
    align-items: center;
    height: 5.4rem;

    padding: 1.8rem 2rem;
    border-radius: 6rem;
    border: 0.05rem solid ${({ theme }) => theme.colors.black40};
    background: ${({ theme }) => theme.colors.black5};

    .icon-search {
      padding-left: 2rem;
    }

    &.active {
      border-radius: 1.8rem 1.8rem 0 0;
      border-bottom: ${({ theme }) => theme.colors.black40};
      background: ${({ theme }) => theme.colors.white};
    }
  }
`;

const SearchHistory = styled.div`
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
        //gap: 3.75rem;
      }
    }

    .search-copy {
      display: flex;
      align-items: center;
      //margin-top: 3.1rem;
      .text-headline {
        flex: 1;
      }
    }
  }
`;

import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useOutSideClick from "@/hooks/useOutSideClick";

import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { modalOverlay } from "@/utils/atom";
import { Z_INDEX_FILTER } from "@/utils/constants";

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

const SearchBar = () => {
  const initialSearch = {
    searchKeyword: "",
    searchFocus: false,
  };

  const navigate = useNavigate();
  const setFocus = useSetRecoilState(modalOverlay);

  const [searchState, setSearchState] = useState(initialSearch);

  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrap = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchState({ ...searchState, searchKeyword: e.target.value });
  };

  const handleFocusOn = () => {
    setSearchState({ ...searchState, searchFocus: true });
    setFocus(true);
    searchRef.current?.focus();
  };

  const handleFocusOut = () => {
    setSearchState({ ...searchState, searchFocus: false });
    setFocus(false);
  };

  useOutSideClick(searchWrap, handleFocusOut);

  const onSearchSubmit = () => {
    console.log("[search keyword]", searchState.searchKeyword);
  };

  return (
    <>
      <SearchBarWrapper
        ref={searchWrap}
        onClick={handleFocusOn}
      >
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
                    {BRAND.map((brand) => (
                      <BrandCard key={`brand-card-${brand.idx}`}>
                        <img
                          className="brand-img"
                          src={brand.img}
                          alt="brand-img"
                        />
                        <div className="brand-name text-subtitle-1">
                          {brand.name}
                        </div>
                      </BrandCard>
                    ))}
                  </div>
                </div>
                <hr />
                <div className="search-copy">
                  <div
                    className="text-headline text-subtitle-1"
                    style={{ display: "inline-flex" }}
                  >
                    이전에 저장한 카피를 찾고 싶으신가요?
                  </div>
                  <Button
                    text="내 북마크"
                    onClick={() => navigate("/bookmark")}
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
  display flex;
  flex-direction: column;
  width: 100%;
  min-width: 55.5rem;
  max-width: 100.9rem;
  cursor: default;

  border: 0.5px solid ${({ theme }) => theme.colors.black30};
  border-radius: 0 0 2rem 2rem;
  background: linear-gradient(0deg, rgba(242, 242, 242, 0.70) 0%, rgba(242, 242, 242, 0.70) 100%), #FFF;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
  padding: 4rem 5.8rem 2.5rem 5.8rem;  
  z-index: ${Z_INDEX_FILTER};

  .search-history__wrap{
    .search-brand{
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      
      .search-brand-content{
        display: flex;
        gap: 3.75rem;
      }
    }
    hr{
      width: 100%;
      background-color: ${(props) => props.theme.colors.black5};
      opacity: 0.3;
      margin-top: 3.1rem;
    }
    .search-copy{
      display: flex;
      align-items: center;
      margin-top: 3.1rem;
      .text-headline{
        flex:1;
      }
    }
  }
`;

const BrandCard = styled.div`
  display: flex;

  .brand-img {
    max-width: 9.6rem; // TODO: searchbar 1280 너비 조절
    height: 9.6rem;
    border-top-left-radius: 1.6rem;
    border-bottom-left-radius: 1.6rem;
  }

  .brand-name {
    min-width: 17.6rem;
    max-width: 17.6rem; // TODO: searchbar 1280 너비 조절
    border-top-right-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;
    font-size: 1.8rem;
    background: ${(props) => props.theme.colors.black5};

    display: flex;
    align-items: center;
    padding-left: 2.2rem;
  }
`;

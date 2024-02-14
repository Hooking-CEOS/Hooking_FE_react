import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import Button from "@/components/Button";
import Input from "@/components/Input";
import SearchHistory from "@/components/Search/SearchHistory";
import useOutSideClick from "@/hooks/useOutSideClick";

import styled, { css } from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchModalOverlay, search } from "@/utils/atom";

const SearchBar = () => {
  const navigate = useNavigate();
  const setOverlay = useSetRecoilState(searchModalOverlay);

  const [searchState, setSearchState] = useRecoilState(search);

  const [keyword, setKeyword] = useState<string>(searchState.searchKeyword);

  const [searchParams, _] = useSearchParams();
  const urlKeyword = searchParams.get("keyword");

  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrap = useRef<HTMLInputElement>(null);

  const location = useLocation();

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

  // 검색창 focus out
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
    if (location.pathname === "/") {
      setSearchState({ ...searchState, searchKeyword: "" });
      setKeyword("");
    }
  }, [location.pathname]);

  return (
    <>
      <SearchBarWrapper
        ref={searchWrap}
        onClick={handleFocusOn}
        active={searchState.searchFocus}
      >
        <form
          onSubmit={onSearchSubmit}
          className="searchbar__wrap"
        >
          <span
            onClick={handleFocusOn}
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
        {searchState.searchFocus && <SearchHistory />}
      </SearchBarWrapper>
    </>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div<{ active: boolean }>`
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

    ${({ active }) =>
      active &&
      css`
        border-radius: 1.8rem 1.8rem 0 0;
        border-bottom: ${({ theme }) => theme.colors.black40};
        background: ${({ theme }) => theme.colors.white};
      `}
  }
`;

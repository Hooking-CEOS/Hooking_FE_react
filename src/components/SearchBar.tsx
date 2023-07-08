import Input from "@/components/Input";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Z_INDEX_MODAL, Z_INDEX_FILTER } from "@/utils/constants";
import { useSetRecoilState } from "recoil";
import { modalOverlay } from "@/utils/atom";
import Button from "@/components/Button";

const SearchBar = () => {
  const initialSearch = {
    searchKeyword: "",
    searchFocus: false,
  };

  const setFocus = useSetRecoilState(modalOverlay);

  const [searchState, setSearchState] = useState(initialSearch);

  const searchRef = useRef<HTMLInputElement>(null);
  const searchWrap = useRef<HTMLInputElement>(null);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchState({ ...searchState, searchKeyword: e.target.value });
  };

  const handleFocusOn = () => {
    setSearchState({ ...searchState, searchFocus: true });
    setFocus(true);
  };

  const clickWrap = (e: any) => {
    // 인풋 클릭한 것도 아니고, searchWrap안에 이벤트가 발생한 경우가 아닐 경우
    if (
      searchWrap &&
      searchWrap.current &&
      document.activeElement !== searchRef.current &&
      !searchWrap.current.contains(e.target)
    ) {
      setSearchState({ ...searchState, searchFocus: false });
      setFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickWrap);
  }, []);

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
      <SearchBarWrapper ref={searchWrap}>
        <div className="searchbar__wrap">
          <span className="icon icon-search" />
          <Input
            placeholder="브랜드 이름, 분위기 등으로 검색해보세요"
            className="text-subtitle-1 searchbar"
            onChange={handleSearch}
            onFocus={handleFocusOn}
            type="text"
            ref={searchRef}
          />
        </div>

        {searchState.searchFocus && (
          <>
            <SearchHistory>
              <div className="search-history__wrap">
                <div className="search-brand">
                  <div className="text-subtitle-1">이달의 브랜드 모아보기</div>
                  <div className="search-brand-content">
                    {BRAND.map((brand) => (
                      <BrandCard key={brand.idx}>
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
                    className="button-orange text-subtitle-1"
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

  .searchbar__wrap {
    display: flex;
    align-items: center;
    height: 5.4rem;

    padding: 1.8rem 2rem;
    border-radius: 6rem;
    border: 0.05rem solid ${(props) => props.theme.colors.black40};
    background: ${(props) => props.theme.colors.black5};
  }
`;

const SearchHistory = styled.div`
  display flex;
  flex-direction: column;
  width: 100%;
  min-width: 55.5rem;
  max-width: 100.9rem;
  background-color: ${(props) => props.theme.colors.white};

  padding: 3.2rem 5.8rem 4.5rem 5.8rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  
  z-index: ${Z_INDEX_FILTER};

  .search-history__wrap{
    font-size: 1.8rem;

    .search-brand{
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
      
      .search-brand-content{
        display: flex;
        gap: 3.75rem;
      }
    }

    .hr{
      width: 100%;
      background-color: ${(props) => props.theme.colors.black5};
      opacity: 0.3;
      margin-top: 3.1rem;
      
    }

    .search-copy{
      margin-top: 3.1rem;
      display: flex;
      align-items: center;

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
    min-width: 13rem;
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

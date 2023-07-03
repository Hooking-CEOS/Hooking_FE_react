import Input from "@/components/Input";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarWrapper>
      <div className="searchbar__wrap">
        <Input
          placeholder="브랜드 이름, 분위기 등으로 검색해보세요"
          className="searchbar text-normal-600"
        />
        <div className="icon-search" />
      </div>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  display: flex;
  height: 6rem;

  .searchbar__wrap {
    position: relative;
    width: 60rem;
    padding: 2.1rem 2.4rem;
    border-radius: 6rem;
    background: ${(props) => props.theme.colors.black5};
  }
`;

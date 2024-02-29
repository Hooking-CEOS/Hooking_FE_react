import HookingIcon from "@/assets/images/icon-hooking_component";
import { search, searchModalOverlay } from "@/utils/atom";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import styled from "styled-components";

const MobileSearchBar = () => {
  const navigate = useNavigate();

  const [searchState, setSearchState] = useRecoilState(search);

  const [keyword, setKeyword] = useState<string>(searchState.searchKeyword);

  const [searchParams, _] = useSearchParams();
  const urlKeyword = searchParams.get("keyword");

  const handleFoucsOn = () => {
    setSearchState({ ...searchState, searchFocus: true });
  };

  const handleFocusOut = () => {
    setSearchState({ ...searchState, searchFocus: false });
  };

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword.trim());
      console.log("urlKeyword", urlKeyword);
    }
  }, [urlKeyword]);

  return (
    <SearchBarWrapper>
      <SearchBarArea>
        <HookingIcon
          width={28}
          height={28}
        />
        브랜드 이름, 분위기 등으로 검색해보세요
      </SearchBarArea>
    </SearchBarWrapper>
  );
};

export default MobileSearchBar;

const SearchBarWrapper = styled.div`
  height: 5.2rem;
  padding: 0.8rem;
`;

const SearchBarArea = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.colors.black3};
  border: 1px solid ${({ theme }) => theme.colors.black10};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.4rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black30};
  gap: 1rem;
`;

import styled from "styled-components";
import MobileButton from "../Button";
import FilterIcon from "@/assets/images/icon-filter_component";
import FrameIcon from "@/assets/images/icon-frame-component";
import ArrowIcon from "@/assets/images/icon-arrow_component";
import { useSetRecoilState } from "recoil";
import { mobileFilterModalOverlay } from "@/utils/atom";
import { useState } from "react";

const INITIAL_FILTER_STATE = {
  brand: [],
  industry: [],
  age: [],
  price: [],
};

type FilterStatus = keyof typeof INITIAL_FILTER_STATE;

const MobileFilter = () => {
  const [filterStatus, setFilterStatus] = useState(INITIAL_FILTER_STATE);
  const [openFilterDropdown, setOpenFilterDropdown] =
    useState<FilterStatus | null>(null);
  const setFilterModal = useSetRecoilState(mobileFilterModalOverlay);

  const handleFilterIconClick = () => {
    setFilterModal(true);
  };

  const handleFilterBtnClick = (type: FilterStatus) => () => {
    setOpenFilterDropdown((prev) => (prev === type ? null : type));
  };

  return (
    <FilterWrapper>
      <ScrollContainer>
        <FilterArea>
          <MobileButton
            fill="#F7F7F9"
            borderColor="#DFE0E6"
            onClick={handleFilterBtnClick("brand")}
          >
            <>
              브랜드 무드
              <ArrowIcon
                direction={openFilterDropdown === "brand" ? "down" : "up"}
              />
            </>
          </MobileButton>
          <MobileButton
            fill="#F7F7F9"
            borderColor="#DFE0E6"
            onClick={handleFilterBtnClick("industry")}
          >
            <>
              산업군
              <ArrowIcon
                direction={openFilterDropdown === "industry" ? "down" : "up"}
              />
            </>
          </MobileButton>
          <MobileButton
            fill="#F7F7F9"
            borderColor="#DFE0E6"
            onClick={handleFilterBtnClick("age")}
          >
            <>
              타겟 나이대
              <ArrowIcon
                direction={openFilterDropdown === "age" ? "down" : "up"}
              />
            </>
          </MobileButton>
          <MobileButton
            fill="#F7F7F9"
            borderColor="#DFE0E6"
            onClick={handleFilterBtnClick("price")}
          >
            <>
              가격대
              <ArrowIcon
                direction={openFilterDropdown === "price" ? "down" : "up"}
              />
            </>
          </MobileButton>
        </FilterArea>
      </ScrollContainer>
      <div className="buttonArea">
        <MobileButton onClick={handleFilterIconClick}>
          <FilterIcon fill={"#00023566"} />
        </MobileButton>
        <MobileButton>
          <FrameIcon
            fill={"#00023566"}
            strokeWidth={1.5}
          />
        </MobileButton>
      </div>
    </FilterWrapper>
  );
};

export default MobileFilter;

const FilterWrapper = styled.div`
  height: 3rem;
  /* background-color: yellowgreen; */
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 1.6rem 0;
  padding: 0 0.8rem;
  .buttonArea {
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  /* position: relative; 희미해지는 효과를 위한 상대 위치 설정 */
  width: 100%;
`;

const FilterArea = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  position: relative;
  /* &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 10%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    pointer-events: none;
  } */
`;

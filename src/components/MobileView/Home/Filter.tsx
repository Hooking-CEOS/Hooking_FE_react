import styled from "styled-components";
import MobileButton from "../Button";
import FilterIcon from "@/assets/images/icon-filter_component";
import FrameIcon from "@/assets/images/icon-frame-component";
import ArrowIcon from "@/assets/images/icon-arrow_component";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mobileCardLayout, mobileFilterModalOverlay } from "@/utils/atom";
import { useState } from "react";

const INITIAL_FILTER_STATE = {
  brand: [],
  industry: [],
  age: [],
  price: [],
};

type FilterStatus = keyof typeof INITIAL_FILTER_STATE;

interface IMobileFilterProps {
  isBrandPage?: boolean;
}

const MobileFilter = ({ isBrandPage = false }: IMobileFilterProps) => {
  const [filterStatus, setFilterStatus] = useState(INITIAL_FILTER_STATE);
  const [openFilterDropdown, setOpenFilterDropdown] =
    useState<FilterStatus | null>(null);
  const setFilterModal = useSetRecoilState(mobileFilterModalOverlay);
  const [mobileLayout, setMobileLayout] = useRecoilState(mobileCardLayout);

  const handleFilterIconClick = () => {
    setFilterModal(true);
  };

  const handleFilterBtnClick = (type: FilterStatus) => () => {
    setOpenFilterDropdown((prev) => (prev === type ? null : type));
  };

  const handleChangeMobileLayout = () => {
    setMobileLayout((prev) => (prev === "small" ? "big" : "small"));
  };

  return (
    <FilterContainer isBrandPage={isBrandPage}>
      {!isBrandPage && (
        <ScrollContainer>
          <FilterArea>
            {filterStatus.brand.length === 0 &&
            filterStatus.industry.length === 0 &&
            filterStatus.age.length === 0 &&
            filterStatus.price.length === 0 ? (
              <>
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
                      direction={
                        openFilterDropdown === "industry" ? "down" : "up"
                      }
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
              </>
            ) : (
              <></>
            )}
          </FilterArea>
        </ScrollContainer>
      )}
      <div className="buttonArea">
        {!isBrandPage && (
          <MobileButton onClick={handleFilterIconClick}>
            <FilterIcon fill={"#00023566"} />
          </MobileButton>
        )}
        <MobileButton onClick={handleChangeMobileLayout}>
          <FrameIcon
            fill={"#00023566"}
            strokeWidth={1.5}
          />
        </MobileButton>
      </div>
    </FilterContainer>
  );
};

export default MobileFilter;

const FilterContainer = styled.div<{ isBrandPage?: boolean }>`
  padding: 1.6rem 0.8rem;
  height: 100%;
  display: flex;
  flex-direction: ${({ isBrandPage }) => (isBrandPage ? "row-reverse" : "row")};
  gap: 2rem;

  .buttonArea {
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
  }
`;

const ScrollContainer = styled.div`
  height: 100%;
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
`;

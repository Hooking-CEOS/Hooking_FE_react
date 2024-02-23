import styled from "styled-components";
import MobileButton from "../Button";
import FilterIcon from "@/assets/images/icon-filter_component";
import FrameIcon from "@/assets/images/icon-frame-component";
import ArrowIcon from "@/assets/images/icon-arrow_component";

const MobileFilter = () => {
  return (
    <FilterWrapper>
      <FilterArea>
        <MobileButton
          fill="#F7F7F9"
          borderColor="#DFE0E6"
        >
          <>
            브랜드 무드
            <ArrowIcon direction="up" />
          </>
        </MobileButton>
        <MobileButton
          fill="#F7F7F9"
          borderColor="#DFE0E6"
        >
          <>산업군</>
        </MobileButton>
        <MobileButton
          fill="#F7F7F9"
          borderColor="#DFE0E6"
        >
          <>타겟 나이대</>
        </MobileButton>
        <MobileButton
          fill="#F7F7F9"
          borderColor="#DFE0E6"
        >
          <>가격대</>
        </MobileButton>
      </FilterArea>
      <div className="buttonArea">
        <MobileButton>
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

const FilterArea = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-direction: row;
  gap: 0.6rem;
`;

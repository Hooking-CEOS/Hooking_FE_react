import MobileCarousel from "@/components/MobileView/Home/Carousel";
import MobileFilter from "@/components/MobileView/Home/Filter";
import MobileSearchBar from "@/components/MobileView/Home/SearchBar";
import styled from "styled-components";

const MobileViewHome = () => {
  return (
    <MobileViewWrapper>
      <MobileSearchBar />
      <MobileCarousel />
      <MobileFilter />
    </MobileViewWrapper>
  );
};

export default MobileViewHome;

const MobileViewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

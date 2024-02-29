import { useState } from "react";
import MobileCardArea from "@/components/MobileView/Home/CardArea";
import MobileCarousel from "@/components/MobileView/Home/Carousel";
import MobileFilter from "@/components/MobileView/Home/Filter";
import MobileSearchBar from "@/components/MobileView/Home/SearchBar";
import { ICardData } from "@/utils/type";
import styled from "styled-components";
import MobileFooter from "@/components/MobileView/Footer";
import MobileFloatingBar from "@/components/MobileView/FloatingBar";

const mockCardData: ICardData[] = [
  {
    id: 1,
    text: "입술에 닿는 순간 샤르르 - 시럽이 녹아든 듯 부드러운 텍스처",
    brandName: "미샤",
    scrapCnt: 0,
    cardLink: "https://www.missha.com/kr/KR/Item/Detail/2010000000001",
    isScrap: 1,
    createdAt: "2021-08-31T14:00:00",
    index: 0,
  },
  {
    id: 2,
    text: "입술에 닿는 순간 샤르르 - 시럽이 녹아든 듯 부드러운 텍스처",
    brandName: "미샤",
    scrapCnt: 0,
    cardLink: "https://www.missha.com/kr/KR/Item/Detail/2010000000001",
    isScrap: 0,
    createdAt: "2021-08-31T14:00:00",
    index: 0,
  },
  {
    id: 3,
    text: "입술에 닿는 순간 샤르르 - 시럽이 녹아든 듯 부드러운 텍스처",
    brandName: "미샤",
    scrapCnt: 0,
    cardLink: "https://www.missha.com/kr/KR/Item/Detail/2010000000001",
    isScrap: 0,
    createdAt: "2021-08-31T14:00:00",
    index: 0,
  },
  {
    id: 4,
    text: "입술에 닿는 순간 샤르르 - 시럽이 녹아든 듯 부드러운 텍스처",
    brandName: "미샤",
    scrapCnt: 0,
    cardLink: "https://www.missha.com/kr/KR/Item/Detail/2010000000001",
    isScrap: 0,
    createdAt: "2021-08-31T14:00:00",
    index: 0,
  },
];

const MobileViewHome = () => {
  return (
    <>
      <MobileViewWrapper>
        <MobileSearchBar />
        <MobileCarousel />
        <MobileStickyArea>
          <MobileFilter />
        </MobileStickyArea>
        <MobileCardArea card={mockCardData} />
      </MobileViewWrapper>
      <MobileFooter />
      <MobileFloatingBar />
    </>
  );
};

export default MobileViewHome;

const MobileViewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MobileStickyArea = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
`;

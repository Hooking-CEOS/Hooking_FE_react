import MobileFooter from "@/components/MobileView/Footer";
import MobileFloatingBar from "@/components/MobileView/FloatingBar";
import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";
import MobileBrandCard from "@/components/MobileView/Home/BrandCard";
import { useEffect } from "react";
const MobileBrandList = () => {
  useEffect(() => {
    imgData.sort((a, b) => Math.random() - Math.random());
  }, []);
  return (
    <>
      <BrandListWrapper>
        브랜드
        <BrandListContainer>
          {imgData.map((data) => (
            <MobileBrandCard
              key={data.id}
              name={data.name_kr}
              brandId={data.id}
            />
          ))}
        </BrandListContainer>
      </BrandListWrapper>
      <MobileFooter />
      <MobileFloatingBar />
    </>
  );
};

export default MobileBrandList;

const BrandListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.black100};
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.8rem 1.4rem 3.2rem;
`;

const BrandListContainer = styled.div`
  padding-top: 1.6rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
`;

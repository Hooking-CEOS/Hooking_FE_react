import BrandIcon from "@/components/Brand/BrandIcon";
import MobileFooter from "@/components/MobileView/Footer";
import MobileFloatingBar from "@/components/MobileView/FloatingBar";
import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";
const MobileBrandList = () => {
  return (
    <BrandListWrapper>
      <BrandListContainer>
        {imgData.map((data, index) => (
          <>{data.id}</>
        ))}
      </BrandListContainer>
      <MobileFooter />
      <MobileFloatingBar />
    </BrandListWrapper>
  );
};

export default MobileBrandList;

const BrandListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BrandListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

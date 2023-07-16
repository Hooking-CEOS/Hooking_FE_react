import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";

interface BrandBannerProps {
  name: string;
}

const BrandBanner = ({ name }: BrandBannerProps) => {
  let targetData = imgData.find((item) => item.name_kr === name)!;

  return (
    <BrandBannerWrapper>
      <BrandBannerDiv
        src={require(`../assets/images/brandBanner/${targetData.name_kr}.png`)}
        alt="brandBanner"
      />
    </BrandBannerWrapper>
  );
};

export default BrandBanner;

const BrandBannerWrapper = styled.div`
  width: 100vw;
  height: 31.35vw;
`;

const BrandBannerDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

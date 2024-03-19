import MobileFooter from "@/components/MobileView/Footer";
import MobileFloatingBar from "@/components/MobileView/FloatingBar";
import styled from "styled-components";
import BrandDetailCarousel from "@/components/Brand/BrandDetailCarousel";
import { useParams } from "react-router-dom";
import { getBrandById, removeAllSpace } from "@/utils/util";
import MobileFilter from "@/components/MobileView/Home/Filter";
import { ICardData } from "@/utils/type";
import MobileCardArea from "@/components/MobileView/Home/CardArea";

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

const MobileBrandDetail = () => {
  const { brandId } = useParams<{ brandId: string }>();
  let targetData = getBrandById(Number(brandId));
  return (
    <BrandDetailWrapper>
      <BrandDetailCarousel
        data={targetData.descText}
        name={targetData.name_kr}
      />
      <BrandDetailContent>
        <BrandIconContainer>
          <img
            src={require(`../../assets/images/brandIcon/brand-${removeAllSpace(
              targetData.name_kr
            )}.png`)}
          />
        </BrandIconContainer>
        <div className="brandData">
          {targetData.name_kr}
          <div className="brandType">
            {targetData.mood.map((mood, idx) => (
              <div
                key={idx}
                className="moodBox"
              >
                {mood}
              </div>
            ))}
          </div>
        </div>
      </BrandDetailContent>
      <MobileFilter isBrandPage={true} />
      <MobileCardArea card={mockCardData} />
      <MobileFooter />
      <MobileFloatingBar />
    </BrandDetailWrapper>
  );
};

export default MobileBrandDetail;

const BrandDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  overflow: scroll;
  flex-direction: column;
`;

const BrandDetailContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  .brandData {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.black100};
    font-weight: 600;
    align-items: center;
    transform: translateY(-30px);
    margin-bottom: -30px;
    .brandType {
      display: flex;
      gap: 0.6rem;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.black40};
      .moodBox {
        padding: 0.4rem 0.8rem;
        border-radius: 1.2rem;
        border: 1px solid ${({ theme }) => theme.colors.black10};
        background-color: ${({ theme }) => theme.colors.black3};
      }
    }
  }
`;

const BrandIconContainer = styled.div`
  width: 60px;
  aspect-ratio: 1/1;
  background-color: white;
  transform: translateY(-50%);
  border-radius: 50%;
  padding: 0.4rem;
  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.black30};
  }
`;

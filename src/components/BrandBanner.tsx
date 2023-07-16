import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";
import BrandIcon from "@/components/BrandIcon";
import BrandMoodButton from "@/components/BrandMoodButton";

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
      <BrandBannerInsideDiv>
        <div className="brandDescSection">
          <div className="brandDescTop">
            <BrandIcon
              name={targetData.name_kr}
              size="big"
            />
            <div className="brandDescTextDiv">
              <span className="brandDescName">{targetData.name_kr}</span>
              <div className="brandMoodDiv">
                <BrandMoodButton name="퓨어한" />
                <BrandMoodButton name="자연의" />
                <BrandMoodButton name="감각적인" />
              </div>
            </div>
          </div>
          <div className="brandDescText">{targetData.brandDesc}</div>
        </div>
      </BrandBannerInsideDiv>
    </BrandBannerWrapper>
  );
};

export default BrandBanner;

const BrandBannerWrapper = styled.div`
  width: 100vw;
  height: 31.35vw;
  position: relative;
`;

const BrandBannerDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BrandBannerInsideDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 6.25vw;
  .brandDescSection {
    display: flex;
    flex-direction: column;
    .brandDescTop {
      display: flex;
      flex-direction: row;
      gap: 1.667vw;
      .brandDescTextDiv {
        display: flex;
        flex-direction: column;
        gap: 0.938vw;
      }
      .brandDescName {
        font-size: 2.083vw;
        color: white;
        font-weight: 700;
      }
      .brandMoodDiv {
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }
    }
    .brandDescText {
      margin-top: 4rem;
      white-space: pre-wrap;
      color: white;
      font-size: 16px;
      font-weight: 300;
      line-height: 150%;
    }
  }
`;

import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";

interface BrandIconProps {
  name: string;
  size?: string;
}

const BrandIcon = ({ name, size }: BrandIconProps) => {
  let targetData = imgData.find((item) => item.name_kr === name)!;

  return (
    <BrandIconWrapper big={size === "big" ? 1 : 0}>
      <BrandIconDiv
        src={require(`../assets/images/brandIcon/brand-${targetData.name_kr}.png`)}
        alt="brandIcon"
      />
    </BrandIconWrapper>
  );
};

export default BrandIcon;

const BrandIconWrapper = styled.div<{ big: number }>`
  width: ${(props) => (props.big === 1 ? "5vw" : "2.6vw")};
  height: ${(props) => (props.big === 1 ? "5vw" : "2.6vw")};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  ${(props) =>
    // TODO: Fix url path
    props.big === 1 &&
    `
    &:after {
      content: '';
      background: url("src/assets/images/instagram.png") no-repeat center;
      position: absolute;
      width: 1.667vw;
      height: 1.667vw;
      background-size: cover;
      right: 0;
      bottom: 0;
    }
  `}
`;

const BrandIconDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

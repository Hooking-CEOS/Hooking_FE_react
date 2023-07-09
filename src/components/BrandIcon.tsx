import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";

interface BrandIconProps {
  name: string;
}

// HELP: 도움!!!!!!!!
const BrandIcon = ({ name }: BrandIconProps) => {
  let targetData = imgData.find((item) => item.name_kr === name)!;

  return (
    <BrandIconWrapper>
      <BrandIconDiv
        src={require(`../assets/images/brandIcon/brand-${targetData.id}.png`)}
      />
    </BrandIconWrapper>
  );
};

export default BrandIcon;

const BrandIconWrapper = styled.div`
  width: 7.8vw;
  height: 2.6vw;
  position: relative;
  top: 3.2vh;
  left: -7vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const BrandIconDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

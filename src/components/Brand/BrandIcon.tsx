import styled from "styled-components";

import { removeAllSpace, getBrandByName } from "@/utils/util";
import { useNavigate } from "react-router-dom";

interface BrandIconProps {
  name: string;
  size?: string;
  clickRef?: string;
}

const BrandIcon = ({ name, size, clickRef }: BrandIconProps) => {
  let targetData = getBrandByName(removeAllSpace(name)!);
  const Navigation = useNavigate();
  const handleClickIcon = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickRef) {
      e.stopPropagation();
      window.open(clickRef, "_blank");
    } else {
      Navigation("/brand/" + targetData.id);
    }
  };

  return (
    <BrandIconWrapper
      big={
        size === "big" ? 1 : size === "small" ? 2 : size !== "mobile" ? 0 : -1
      }
      onClick={handleClickIcon}
    >
      <BrandIconDiv
        src={require(`../../assets/images/brandIcon/brand-${removeAllSpace(
          targetData.name_kr
        )}.png`)}
        alt="brandIcon"
      />
      {size === "big" && (
        <BrandIconIGDiv
          src={require("../../assets/images/instagram.png")}
          alt="instagramLogo"
        />
      )}
    </BrandIconWrapper>
  );
};

export default BrandIcon;

const BrandIconWrapper = styled.div<{ big: number }>`
  width: ${(props) =>
    props.big === 1
      ? "5vw"
      : props.big === 2
      ? "3.6rem"
      : props.big === 0
      ? "2.6vw"
      : "100%"};
  aspect-ratio: 1/1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

const BrandIconIGDiv = styled.img`
  width: 1.667vw;
  height: 1.667vw;
  object-fit: contain;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const BrandIconDiv = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getBrandByName } from "@/utils/util";
import { useState } from "react";

interface IBLCProps {
  brand: any;
  onClick?: () => void;
}

const BrandLogoCard = ({ brand, onClick }: IBLCProps) => {
  const [targetData, setTargetId] = useState(getBrandByName(brand.name));

  //let targetData = getBrandByName(brand.name); // 에러나서 state에 저장하는 걸로 수정했어!!
  const Navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
    Navigate("/brand/" + targetData.id);
  };
  return (
    <BrandCard className="brand-card">
      <img
        onClick={handleCardClick}
        width="96px"
        height="96px"
        className="brand-img"
        src={brand.img}
        alt="brand-img"
        loading="lazy"
      />
      <div
        className="brand-name"
        onClick={handleCardClick}
      >
        <span className="text-subtitle-1">{brand.name}</span>
      </div>
    </BrandCard>
  );
};

export default BrandLogoCard;

const BrandCard = styled.div`
  display: inline-flex;

  width: 100%;

  & + .brand-card {
    margin-left: 3.75rem; // 서치바에서는 37.5px
  }
  .brand-img {
    max-width: 9.6rem;
    height: 9.6rem;
    border-top-left-radius: 1.6rem;
    border-bottom-left-radius: 1.6rem;
    background-color: ${(props) => props.theme.colors.black5};
    cursor: pointer;
  }

  .brand-name {
    flex: 1;
    width: 100%;
    max-width: 17.6rem;
    border-top-right-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;
    font-size: 1.8rem;
    background: ${(props) => props.theme.colors.black5};

    display: flex;
    align-items: center;

    cursor: pointer;
    .text-subtitle-1 {
      padding: 2.2rem;
    }
  }
`;

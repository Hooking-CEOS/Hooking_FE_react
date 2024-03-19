import { ICardData } from "@/utils/type";
import styled from "styled-components";
import { removeAllSpace } from "@/utils/util";
import { useNavigate } from "react-router-dom";

const MobileBrandCard = ({
  name,
  brandId,
}: {
  name: string;
  brandId: number;
}) => {
  const navigate = useNavigate();
  const handleBrandCardClick = () => {
    navigate(`/brand/${brandId}`);
  };
  return (
    <BrandCardWrapper onClick={handleBrandCardClick}>
      <img
        src={require(`../../../assets/images/brandSearch/brand-search-${removeAllSpace(
          name
        )}.png`)}
      />
      {name}
    </BrandCardWrapper>
  );
};

export default MobileBrandCard;

const BrandCardWrapper = styled.div`
  width: 100%;
  height: 6.4rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  flex: 0;
  gap: 1.4rem;
  background-color: ${({ theme }) => theme.colors.black5};
  font-size: 1.4rem;
  img {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 1rem 0 0 1rem;
  }
`;

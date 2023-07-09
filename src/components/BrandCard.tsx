import styled from "styled-components";

interface BrandProps {
  text: string;
  brandName: string;
  brandId?: number;
  brandImg?: string;
  onClick?: () => void;
}

const BrandCard = ({
  text,
  brandName,
  brandImg,
  brandId,
  onClick,
}: BrandProps) => {
  return (
    <BrandCardWrapper onClick={onClick}>
      <div className="card-content text-normal-300">{text}</div>
      <div className="card-brand">
        <img src={brandImg} />
        <span className="text-normal-700">{brandName}</span>
      </div>
    </BrandCardWrapper>
  );
};

export default BrandCard;

const BrandCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 37.8rem;
  max-height: 27.2rem;
  padding: 3.8rem 4rem;

  border: 0.025rem solid ${(props) => props.theme.colors.black40};
  border-radius: 2rem;
  background: ${(props) => props.theme.colors.white};
  cursor: pointer;

  .card-content {
    width: 100%;
    white-space: pre-wrap;
    max-height: 12rem;
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black100};
    margin-bottom: 2.4rem;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }

  .card-brand {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;
    padding-top: 1.2rem;
    border-top: 1px solid ${(props) => props.theme.colors.black30};
    gap: 1rem;
  }
`;

import styled from "styled-components";

interface BrandProps {
  text: string;
  brandName: string;
  brandId: number;
  brandImg?: string;
}

const BrandCard = ({ text, brandName, brandImg, brandId }: BrandProps) => {
  return (
    <BrandCardWrapper>
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

  .card-content {
    width: 100%;
    white-space: no-wrap;
    max-height: 12rem;
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black100};
    margin-bottom: 2.4rem;
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

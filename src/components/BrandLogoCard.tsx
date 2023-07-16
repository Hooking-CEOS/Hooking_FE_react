import styled from "styled-components";

const BrandLogoCard = ({ brand }: any) => {
  return (
    <BrandCard className="brand-card">
      <img
        className="brand-img"
        src={brand.img}
        alt="brand-img"
      />
      <div className="brand-name text-subtitle-1">{brand.name}</div>
    </BrandCard>
  );
};

export default BrandLogoCard;

const BrandCard = styled.div`
  display: inline-flex;

  & + .brand-card {
    margin-left: 3.75rem; // 서치바에서는 37.5px
  }
  .brand-img {
    max-width: 9.6rem; // TODO: searchbar 1280 너비 조절
    height: 9.6rem;
    border-top-left-radius: 1.6rem;
    border-bottom-left-radius: 1.6rem;
  }

  .brand-name {
    min-width: 17.6rem;
    max-width: 17.6rem; // TODO: searchbar 1280 너비 조절
    border-top-right-radius: 1.6rem;
    border-bottom-right-radius: 1.6rem;
    font-size: 1.8rem;
    background: ${(props) => props.theme.colors.black5};

    display: flex;
    align-items: center;
    padding-left: 2.2rem;
  }
`;
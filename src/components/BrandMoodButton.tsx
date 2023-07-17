import styled from "styled-components";

interface IBrandMoodButtonProps {
  name: string;
}

const BrandMoodButton = ({ name }: IBrandMoodButtonProps) => {
  return (
    <BrandMoodButtonWrapper>
      <BrandMoodText>{name}</BrandMoodText>
    </BrandMoodButtonWrapper>
  );
};

export default BrandMoodButton;

const BrandMoodButtonWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white25};
  border-radius: 60px;
  padding: 1.1rem 1.6rem;
`;

const BrandMoodText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
`;
